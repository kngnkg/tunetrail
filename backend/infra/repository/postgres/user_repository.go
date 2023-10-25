package postgres

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/helper"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
	"github.com/lib/pq"
)

type UserRepository struct{}

func (r *UserRepository) ListUsers(ctx context.Context, db repository.Executor, filter *entity.UserFilter) ([]*entity.User, error) {
	query := `
		SELECT user_id, display_id, name, avatar_url, bio, created_at, updated_at
		FROM users WHERE 1 = 1`

	placeholderNum := 1
	args := []interface{}{}

	if len(filter.UserIds) > 0 {
		query += " AND user_id IN("
		for _, id := range filter.UserIds {
			query += fmt.Sprintf(" $%d,", placeholderNum)
			args = append(args, id)
			placeholderNum++
		}
		query = helper.RemoveLastComma(query) + ")"
	}

	if len(filter.DisplayIds) > 0 {
		query += " AND display_id IN("
		for _, id := range filter.DisplayIds {
			query += fmt.Sprintf(" $%d,", placeholderNum)
			args = append(args, id)
			placeholderNum++
		}
		query = helper.RemoveLastComma(query) + ")"
	}

	users := []*entity.User{}
	err := db.SelectContext(ctx, &users, query, args...)
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (r *UserRepository) StoreUser(ctx context.Context, db repository.Executor, user *entity.User) (*entity.User, error) {
	query := `
		INSERT INTO users (user_id, display_id, name, avatar_url, bio, created_at, updated_at)
		VALUES (:user_id, :display_id, :name, :avatar_url, :bio, NOW(), NOW())
		RETURNING user_id, display_id, name, avatar_url, bio, created_at, updated_at;`

	_, err := db.NamedExecContext(ctx, query, user)
	if err != nil {
		// 重複エラーの場合
		var pqError *pq.Error
		if errors.As(err, &pqError) && pqError.Code == ErrCodePostgresDuplicate {
			if pqError.Constraint == ConstraintUsersDisplayId {
				return nil, fmt.Errorf("%w: %w", repository.ErrorDisplayIdAlreadyExists, err)
			}
		}
		return nil, err
	}

	return user, nil
}

func (r *UserRepository) GetUserById(ctx context.Context, db repository.Executor, userId entity.UserId) (*entity.User, error) {
	query := `
		SELECT user_id, display_id, name, avatar_url, bio, created_at, updated_at
		FROM users
		WHERE user_id = $1`

	u := &entity.User{}
	err := db.GetContext(ctx, u, query, userId)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return u, nil
}
