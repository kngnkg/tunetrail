package postgres

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
)

type UserRepository struct{}

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
