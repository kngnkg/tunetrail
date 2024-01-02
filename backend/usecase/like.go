package usecase

import (
	"context"

	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/infra/repository"
	"github.com/kngnkg/foderee/backend/logger"
)

type LikeUseCase struct {
	DB repository.DBAccesser
	ur UserRepository
	rr ReviewRepository
	lr LikeRepository
}

func NewLikeUseCase(db repository.DBAccesser, ur UserRepository, rr ReviewRepository, lr LikeRepository) *LikeUseCase {
	return &LikeUseCase{
		DB: db,
		ur: ur,
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

func (uc *LikeUseCase) ListLikedReviews(ctx context.Context, username entity.Username, cursor string, limit int) (*ReviewListResponse, error) {
	// ユーザーを取得
	user, err := uc.ur.GetUserByUsername(ctx, uc.DB, username)
	if err != nil {
		return nil, err
	}

	// 次のページがあるかどうかを判定するために、limit+1件取得する
	rs, err := uc.lr.ListLikedReviews(ctx, uc.DB, user.ImmutableId, cursor, limit+1)
	if err != nil {
		return nil, err
	}

	if len(rs) == 0 {
		return &ReviewListResponse{
			Reviews:    []*entity.Review{},
			NextCursor: "",
		}, nil
	}

	nextCursor := ""
	if len(rs) > limit {
		// limit を超えた最初の要素の id を取得
		nextCursor = rs[limit].ReviewId
		// limit までの要素を取得
		rs = rs[:limit]
	}

	// 取得するユーザーIdのスライスを作成する
	uids := make([]entity.ImmutableId, len(rs))
	for i, r := range rs {
		uids[i] = r.Author.ImmutableId
	}

	// ユーザー情報を取得する
	us, err := uc.ur.ListUsersById(ctx, uc.DB, uids)
	if err != nil {
		return nil, err
	}

	// ユーザー情報を著者情報としてマップに格納する
	am := make(map[entity.ImmutableId]*entity.Author)
	for _, u := range us {
		am[u.ImmutableId] = u.ToAuthor()
	}

	for _, r := range rs {
		// レビュー情報に著者情報を埋め込む

		if author, ok := am[r.Author.ImmutableId]; ok {
			r.Author = author
		}

		// いいね数を取得する
		count, err := uc.lr.GetLikesCountByReviewId(ctx, uc.DB, r.ReviewId)
		if err != nil {
			return nil, err
		}
		r.LikesCount = count
	}

	// limit を超えた要素がある場合に、その要素のIdを次のページのカーソルとして返す
	resp := &ReviewListResponse{
		Reviews:    rs,
		NextCursor: nextCursor,
	}
	return resp, nil
}
