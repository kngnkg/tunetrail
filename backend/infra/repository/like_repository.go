package repository

import (
	"context"

	"github.com/kngnkg/foderee/backend/entity"
)

type LikeRepository struct{}

func (r *LikeRepository) IsLiked(ctx context.Context, db Executor, immutableId entity.ImmutableId, reviewId string) (bool, error) {
	query := `
		SELECT EXISTS(
			SELECT 1 FROM likes
			WHERE user_id = $1 AND review_id = $2 LIMIT 1);`

	var exists bool
	err := db.GetContext(ctx, &exists, query, immutableId, reviewId)
	if err != nil {
		return false, err
	}

	return exists, nil
}

func (r *LikeRepository) StoreLike(ctx context.Context, db Executor, like *entity.Like) (*entity.Like, error) {
	query := `
		INSERT INTO likes (user_id, review_id, created_at, updated_at)
		VALUES ($1, $2, now(), now())
		RETURNING user_id, review_id, created_at, updated_at;`

	err := db.GetContext(ctx, like, query, like.ImmutableId, like.ReviewId)
	if err != nil {
		return nil, err
	}

	return like, nil
}
