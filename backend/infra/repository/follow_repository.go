package repository

import (
	"context"

	"github.com/kngnkg/foderee/backend/entity"
)

type FollowRepository struct{}

func (r *FollowRepository) StoreFollow(ctx context.Context, db Executor, follow *entity.Follow) (*entity.Follow, error) {
	query := `
		INSERT INTO follows(user_id, follow_user_id, created_at, updated_at)
		VALUES ($1, $2, now(), now())
		RETURNING user_id, follow_user_id, created_at, updated_at;`

	err := db.GetContext(ctx, follow, query, follow.ImmutableId, follow.FolloweeImmutableId)
	if err != nil {
		return nil, err
	}

	return follow, nil
}
