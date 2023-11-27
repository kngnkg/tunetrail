package repository

import (
	"context"

	"github.com/kngnkg/foderee/backend/entity"
)

type FollowRepository struct{}

func (r *FollowRepository) IsFollowing(ctx context.Context, db Executor, sourceId, targetId entity.ImmutableId) (bool, error) {
	query := `
		SELECT EXISTS(
			SELECT 1 FROM follows
			WHERE user_id = $1 AND follow_user_id = $2 LIMIT 1);`

	var exists bool
	err := db.GetContext(ctx, &exists, query, sourceId, targetId)
	if err != nil {
		return false, err
	}

	return exists, nil
}

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

func (r *FollowRepository) DeleteFollow(ctx context.Context, db Executor, follow *entity.Follow) (*entity.Follow, error) {
	query := `
		DELETE FROM follows
		WHERE user_id = $1 AND follow_user_id = $2
		RETURNING user_id, follow_user_id, created_at, updated_at;`

	err := db.GetContext(ctx, follow, query, follow.ImmutableId, follow.FolloweeImmutableId)
	if err != nil {
		return nil, err
	}

	return follow, nil
}
