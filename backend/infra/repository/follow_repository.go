package repository

import (
	"context"
	"fmt"

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

func (r *FollowRepository) GetFollowingCountByUserId(ctx context.Context, db Executor, immutableId entity.ImmutableId) (int, error) {
	query := `
		SELECT COUNT(*) FROM follows
		WHERE user_id = $1;`

	var count int
	err := db.GetContext(ctx, &count, query, immutableId)
	if err != nil {
		return 0, err
	}

	return count, nil
}

func (r *FollowRepository) GetFollowerCountByUserId(ctx context.Context, db Executor, immutableId entity.ImmutableId) (int, error) {
	query := `
		SELECT COUNT(*) FROM follows
		WHERE follow_user_id = $1;`

	var count int
	err := db.GetContext(ctx, &count, query, immutableId)
	if err != nil {
		return 0, err
	}

	return count, nil
}

func (r *FollowRepository) ListFollowingsByUserId(ctx context.Context, db Executor, immutableId, cursor entity.ImmutableId, limit int) ([]*entity.Follow, error) {
	query := `
		SELECT user_id, follow_user_id, created_at, updated_at
		FROM follows
		WHERE user_id = $1`

	args := []interface{}{}
	args = append(args, immutableId)
	placeholderNum := 2

	if cursor != "" {
		query += fmt.Sprintf(" AND created_at < (SELECT created_at FROM follows WHERE user_id = $%d AND follow_user_id = $%d)", placeholderNum, placeholderNum+1)
		args = append(args, immutableId, cursor)
		placeholderNum += 2
	}

	query += fmt.Sprintf(" ORDER BY created_at DESC LIMIT $%d;", placeholderNum)
	args = append(args, limit)

	follows := make([]*entity.Follow, 0, limit)
	err := db.SelectContext(ctx, &follows, query, args...)
	if err != nil {
		return nil, err
	}

	return follows, nil
}

func (r *FollowRepository) ListFollowersByUserId(ctx context.Context, db Executor, immutableId, cursor entity.ImmutableId, limit int) ([]*entity.Follow, error) {
	query := `
		SELECT user_id, follow_user_id, created_at, updated_at
		FROM follows
		WHERE follow_user_id = $1`

	args := []interface{}{}
	args = append(args, immutableId)
	placeholderNum := 2

	if cursor != "" {
		query += fmt.Sprintf(" AND created_at < (SELECT created_at FROM follows WHERE follow_user_id = $%d AND user_id = $%d)", placeholderNum, placeholderNum+1)
		args = append(args, immutableId, cursor)
		placeholderNum += 2
	}

	query += fmt.Sprintf(" ORDER BY created_at DESC LIMIT $%d;", placeholderNum)
	args = append(args, limit)

	follows := make([]*entity.Follow, 0, limit)
	err := db.SelectContext(ctx, &follows, query, args...)
	if err != nil {
		return nil, err
	}

	return follows, nil
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
