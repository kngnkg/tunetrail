package usecase

import (
	"context"

	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/infra/repository"
	"github.com/kngnkg/foderee/backend/logger"
)

type LikeUseCase struct {
	DB repository.DBAccesser
	rr ReviewRepository
	lr LikeRepository
}

func NewLikeUseCase(db repository.DBAccesser, rr ReviewRepository, lr LikeRepository) *LikeUseCase {
	return &LikeUseCase{
		DB: db,
		rr: rr,
		lr: lr,
	}
}

type LikeResponse struct {
	Review  *entity.Review
	IsLiked bool
}

func (uc *LikeUseCase) GetLike(ctx context.Context, immutableId entity.ImmutableId, reviewId string) (*LikeResponse, error) {
	// レビューを取得
	review, err := uc.rr.GetReviewById(ctx, uc.DB, reviewId)
	if err != nil {
		return nil, err
	}

	// いいねしているか確認する
	isLiked, err := uc.lr.IsLiked(ctx, uc.DB, immutableId, reviewId)
	if err != nil {
		return nil, err
	}

	return &LikeResponse{
		Review:  review,
		IsLiked: isLiked,
	}, nil
}

func (uc *LikeUseCase) Like(ctx context.Context, immutableId entity.ImmutableId, reviewId string) (*LikeResponse, error) {
	// レビューを取得
	review, err := uc.rr.GetReviewById(ctx, uc.DB, reviewId)
	if err != nil {
		return nil, err
	}

	tx, err := uc.DB.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}

	_, err = uc.lr.StoreLike(ctx, tx, &entity.Like{
		ImmutableId: immutableId,
		ReviewId:    reviewId,
	})
	if err != nil {
		defer func() {
			if err := tx.Rollback(); err != nil {
				logger.FromContext(ctx).Error("failed to rollback transaction: %v", err)
			}
		}()

		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &LikeResponse{
		Review:  review,
		IsLiked: true,
	}, nil
}

func (uc *LikeUseCase) Unlike(ctx context.Context, immutableId entity.ImmutableId, reviewId string) (*LikeResponse, error) {
	// レビューを取得
	review, err := uc.rr.GetReviewById(ctx, uc.DB, reviewId)
	if err != nil {
		return nil, err
	}

	tx, err := uc.DB.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}

	_, err = uc.lr.DeleteLike(ctx, tx, &entity.Like{
		ImmutableId: immutableId,
		ReviewId:    reviewId,
	})
	if err != nil {
		defer func() {
			if err := tx.Rollback(); err != nil {
				logger.FromContext(ctx).Error("failed to rollback transaction: %v", err)
			}
		}()

		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return &LikeResponse{
		Review:  review,
		IsLiked: false,
	}, nil
}
