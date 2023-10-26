package repository

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/helper"
	"github.com/lib/pq"
)

type UserRepository struct{}

func (r *UserRepository) ListUsersByUsername(ctx context.Context, db Executor, usernames []entity.Username) ([]*entity.User, error) {
	query := `
		SELECT user_id, username, display_name, avatar_url, bio, created_at, updated_at
		FROM users WHERE 1 = 1`

	placeholderNum := 1
	args := []interface{}{}

	if len(usernames) > 0 {
		query += " AND username IN( "
		for _, username := range usernames {
			query += fmt.Sprintf(" $%d,", placeholderNum)
			args = append(args, username)
			placeholderNum++
		}
		query += helper.RemoveLastComma(query) + ")"
	}

	query += " ORDER BY created_at DESC"

	users := []*entity.User{}
	err := db.SelectContext(ctx, &users, query, args...)
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (r *UserRepository) ListUsersById(ctx context.Context, db Executor, userIds []entity.ImmutableId) ([]*entity.User, error) {
	query := `
		SELECT user_id, username, display_name, avatar_url, bio, created_at, updated_at
		FROM users WHERE 1 = 1`

	placeholderNum := 1
	args := []interface{}{}

	if len(userIds) > 0 {
		query += " AND user_id IN( "
		for _, id := range userIds {
			query += fmt.Sprintf(" $%d,", placeholderNum)
			args = append(args, id)
			placeholderNum++
		}
		query += helper.RemoveLastComma(query) + ")"
	}

	query += " ORDER BY created_at DESC"

	users := []*entity.User{}
	err := db.SelectContext(ctx, &users, query, args...)
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (r *UserRepository) StoreUser(ctx context.Context, db Executor, user *entity.User) (*entity.User, error) {
	query := `
		INSERT INTO users (user_id, username, display_name, avatar_url, bio, created_at, updated_at)
		VALUES (:user_id, :username, :display_name, :avatar_url, :bio, NOW(), NOW())
		RETURNING user_id, username, display_name, avatar_url, bio, created_at, updated_at;`

	_, err := db.NamedExecContext(ctx, query, user)
	if err != nil {
		// 重複エラーの場合
		var pqError *pq.Error
		if errors.As(err, &pqError) && pqError.Code == ErrCodePostgresDuplicate {
			if pqError.Constraint == ConstraintUsersDisplayId {
				return nil, fmt.Errorf("%w: %w", ErrorDisplayIdAlreadyExists, err)
			}
		}
		return nil, err
	}

	return user, nil
}

func (r *UserRepository) GetUserByUsername(ctx context.Context, db Executor, username entity.Username) (*entity.User, error) {
	query := `
		SELECT user_id, username, display_name, avatar_url, bio, created_at, updated_at
		FROM users
		WHERE username = $1`

	u := &entity.User{}
	err := db.GetContext(ctx, u, query, username)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return u, nil
}
