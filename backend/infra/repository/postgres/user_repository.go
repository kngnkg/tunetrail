package postgres

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/helper"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
	"github.com/kngnkg/tunetrail/backend/logger"
	"github.com/lib/pq"
)

type UserRepository struct{}

// handleUsersNextCursor は、limit を超えた要素がある場合に、次のページがあるかどうかを判定する
func handleUsersNextCursor(ctx context.Context, users []*entity.User, limit int) ([]*entity.User, entity.UserId, error) {
	if len(users) <= limit {
		return users, "", nil
	}

	// limit を超えた最初の要素を取得
	firstExceedsUser := users[limit]

	// limit までの要素と、次のページのカーソルを返す
	return users[:limit], firstExceedsUser.UserId, nil
}

func (r *UserRepository) ListUsers(ctx context.Context, db repository.Executor, filter *entity.UserFilter) ([]*entity.User, entity.UserId, error) {
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

	if filter.Limit > 0 {
		query += fmt.Sprintf(" LIMIT %d", filter.Limit)
	}

	users := []*entity.User{}
	err := db.SelectContext(ctx, &users, query, args...)
	if err != nil {
		logger.FromContent(ctx).Error("failed to get users.", err)
		return nil, "", err
	}

	users, nextCursor, err := handleUsersNextCursor(ctx, users, filter.Limit)
	if err != nil {
		return nil, "", err
	}

	return users, nextCursor, nil
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
