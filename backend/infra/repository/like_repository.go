package repository

import (
	"context"

	"github.com/kngnkg/foderee/backend/entity"
)

type LikeRepository struct{}

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
