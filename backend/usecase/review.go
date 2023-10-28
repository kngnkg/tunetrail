package usecase

import (
	"context"
	"fmt"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
	"github.com/kngnkg/tunetrail/backend/logger"
)

type ReviewUseCase struct {
	DB         repository.DBAccesser
	reviewRepo ReviewRepository
	userRepo   UserRepository
}

func NewReviewUseCase(db repository.DBAccesser, rr ReviewRepository, ur UserRepository) *ReviewUseCase {
	return &ReviewUseCase{
		DB:         db,
		reviewRepo: rr,
		userRepo:   ur,
	}
}

type ReviewListResponse struct {
	Reviews    []*entity.Review
	NextCursor string
}

func (uc *ReviewUseCase) ListReviews(ctx context.Context, reviewId string, limit int) (*ReviewListResponse, error) {
	// 次のページがあるかどうかを判定するために、limit+1件取得する
	rs, err := uc.reviewRepo.ListReviews(ctx, uc.DB, reviewId, limit+1)
	if err != nil {
		return nil, err
	}

	nextCursor := ""
	if len(rs) > limit {
		// limit を超えた最初の要素を取得
		nextCursor = rs[limit].ReviewId
	}
	// limit までの要素を取得
	rs = rs[:limit]

	// 取得するユーザーIdのスライスを作成する
	uids := make([]entity.ImmutableId, len(rs))
	for i, r := range rs {
		uids[i] = r.Author.ImmutableId
	}

	// ユーザー情報を取得する
	us, err := uc.userRepo.ListUsersById(ctx, uc.DB, uids)
	if err != nil {
		return nil, err
	}

	// ユーザー情報を著者情報としてマップに格納する
	am := make(map[entity.ImmutableId]*entity.Author)
	for _, u := range us {
		am[u.ImmutableId] = u.ToAuthor()
	}

	// レビュー情報に著者情報を埋め込む
	for _, r := range rs {
		if author, ok := am[r.Author.ImmutableId]; ok {
			r.Author = author
		}
	}

	// limit を超えた要素がある場合に、その要素のIdを次のページのカーソルとして返す
	resp := &ReviewListResponse{
		Reviews:    rs,
		NextCursor: nextCursor,
	}
	return resp, nil
}

func (uc *ReviewUseCase) GetReviewById(ctx context.Context, reviewId string) (*entity.Review, error) {
	r, err := uc.reviewRepo.GetReviewById(ctx, uc.DB, reviewId)
	if err != nil {
		return nil, err
	}
	if r == nil {
		return nil, nil
	}

	var ids []entity.ImmutableId
	ids = append(ids, r.Author.ImmutableId)
	users, err := uc.userRepo.ListUsersById(ctx, uc.DB, ids)
	if err != nil {
		return nil, err
	}
	if len(users) != 1 {
		return nil, fmt.Errorf("length of users is not 1, len(users)=%v", len(users))
	}

	r.Author = users[0].ToAuthor()

	return r, nil
}

func (uc *ReviewUseCase) Store(ctx context.Context, authorId entity.ImmutableId, albumId, title, content string, status entity.PublishedStatus) (*entity.Review, error) {
	review := &entity.Review{
		PublishedStatus: status,
		Author: &entity.Author{
			ImmutableId: authorId,
		},
		AlbumId: albumId,
		Title:   title,
		Content: content,
	}

	tx, err := uc.DB.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}

	r, err := uc.reviewRepo.StoreReview(ctx, tx, review)
	if err != nil {
		defer func() {
			if err := tx.Rollback(); err != nil {
				logger.FromContent(ctx).Error("failed to rollback transaction: %v", err)
			}
		}()

		return nil, err
	}

	// TODO: Commitのエラーハンドリング
	if err = tx.Commit(); err != nil {
		return nil, err
	}

	var ids []entity.ImmutableId
	ids = append(ids, r.Author.ImmutableId)
	users, err := uc.userRepo.ListUsersById(ctx, uc.DB, ids)
	if err != nil {
		return nil, err
	}
	if len(users) != 1 {
		return nil, fmt.Errorf("length of users is not 1, len(users)=%v", len(users))
	}

	review.Author = users[0].ToAuthor()

	return review, nil
}

func (uc *ReviewUseCase) Update(ctx context.Context, reviewId string, title string, content string, publishedStatus entity.PublishedStatus) (*entity.Review, error) {
	r := &entity.Review{
		ReviewId:        reviewId,
		Title:           title,
		Content:         content,
		PublishedStatus: publishedStatus,
	}

	tx, err := uc.DB.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}

	r, err = uc.reviewRepo.UpdateReview(ctx, tx, r)
	if err != nil {
		defer func() {
			if err := tx.Rollback(); err != nil {
				logger.FromContent(ctx).Error("failed to rollback transaction: %v", err)
			}
		}()

		return nil, err
	}

	// TODO: Commitのエラーハンドリング
	if err = tx.Commit(); err != nil {
		return nil, err
	}

	var ids []entity.ImmutableId
	ids = append(ids, r.Author.ImmutableId)
	users, err := uc.userRepo.ListUsersById(ctx, uc.DB, ids)
	if err != nil {
		return nil, err
	}
	if len(users) != 1 {
		return nil, fmt.Errorf("length of users is not 1, len(users)=%v", len(users))
	}

	r.Author = users[0].ToAuthor()

	return r, nil
}

func (uc *ReviewUseCase) DeleteReview(ctx context.Context, reviewId string) error {
	tx, err := uc.DB.BeginTxx(ctx, nil)
	if err != nil {
		return err
	}

	err = uc.reviewRepo.DeleteReview(ctx, tx, reviewId)
	if err != nil {
		defer func() {
			if err := tx.Rollback(); err != nil {
				logger.FromContent(ctx).Error("failed to rollback transaction: %v", err)
			}
		}()

		return err
	}

	// TODO: Commitのエラーハンドリング
	return tx.Commit()
}
