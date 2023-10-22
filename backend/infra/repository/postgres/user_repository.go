package postgres

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
)

type UserRepository struct{}

func (r *UserRepository) StoreUser(ctx context.Context, db repository.Executor, user *entity.User) (*entity.User, error) {
	query := `
		INSERT INTO users (user_id, display_id, name, avatar_url, bio, created_at, updated_at)
		VALUES (:user_id, :display_id, :name, :avatar_url, :bio, NOW(), NOW())
		RETURNING user_id, display_id, name, avatar_url, bio, created_at, updated_at;`

	_, err := db.NamedExecContext(ctx, query, user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *UserRepository) GetUserById(ctx context.Context, db repository.Executor, userId entity.UserId) (*entity.User, error) {
	u := &entity.User{}

	query := `
		SELECT user_id, display_id, name, avatar_url, bio, created_at, updated_at
		FROM users
		WHERE user_id = $1`

	err := db.GetContext(ctx, u, query, userId)
	if err != nil {
		return nil, err
	}

	return u, nil
}
