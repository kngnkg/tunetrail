package repository

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/helper"
	"github.com/lib/pq"
)

type UserRepository struct{}

func (r *UserRepository) ListUsers(ctx context.Context, db Executor, immutableId entity.ImmutableId, limit int) ([]*entity.User, error) {
	query := `
        SELECT user_id, username, display_name, avatar_url, bio, created_at, updated_at
        FROM users WHERE 1 = 1`

	placeholderNum := 1
	args := []interface{}{}

	if immutableId != "" {
		query += fmt.Sprintf(" AND created_at <= (SELECT created_at FROM users WHERE user_id = $%d)", placeholderNum)
		args = append(args, immutableId)
		placeholderNum++
	}

	query += fmt.Sprintf(" ORDER BY created_at DESC LIMIT $%d;", placeholderNum)
	args = append(args, limit)

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
		query += " AND user_id IN("
		for _, id := range userIds {
			query += fmt.Sprintf(" $%d,", placeholderNum)
			args = append(args, id)
			placeholderNum++
		}
		query = helper.RemoveLastComma(query) + ")"
	}

	query += " ORDER BY created_at DESC"

	users := []*entity.User{}
	err := db.SelectContext(ctx, &users, query, args...)
	if err != nil {
		return nil, err
	}

	return users, nil
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

func (r *UserRepository) GetUserByImmutableId(ctx context.Context, db Executor, immutableId entity.ImmutableId) (*entity.User, error) {
	query := `
		SELECT user_id, username, display_name, avatar_url, bio, created_at, updated_at
		FROM users
		WHERE user_id = $1`

	u := &entity.User{}
	err := db.GetContext(ctx, u, query, immutableId)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return u, nil
}

func (r *UserRepository) StoreUser(ctx context.Context, db Executor, user *entity.User) (*entity.User, error) {
	query := `
		INSERT INTO users (user_id, username, display_name, avatar_url, bio, created_at, updated_at)
		VALUES (:user_id, :username, :display_name, :avatar_url, :bio, NOW(), NOW())
		RETURNING user_id, username, display_name, avatar_url, bio, created_at, updated_at;`

	user, err := namedExecUser(ctx, db, query, user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *UserRepository) UpdateUser(ctx context.Context, db Executor, user *entity.User) (*entity.User, error) {
	query := `
		UPDATE users
		SET username = :username,display_name = :display_name, avatar_url = :avatar_url, bio = :bio, updated_at = NOW()
		WHERE user_id = :user_id
		RETURNING user_id, username, display_name, avatar_url, bio, created_at, updated_at;`

	user, err := namedExecUser(ctx, db, query, user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func namedExecUser(ctx context.Context, db Executor, query string, user *entity.User) (*entity.User, error) {
	_, err := db.NamedExecContext(ctx, query, user)
	if err != nil {
		// 重複エラーの場合
		var pqError *pq.Error
		if errors.As(err, &pqError) && pqError.Code == ErrCodePostgresDuplicate {
			if pqError.Constraint == ConstraintUsersDisplayId {
				return nil, fmt.Errorf("%w: %w", ErrorUsernameAlreadyExists, err)
			}
		}
		return nil, err
	}

	return user, nil
}
