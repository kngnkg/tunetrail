package usecase

import (
	"context"
	"errors"
	"fmt"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
	"github.com/kngnkg/tunetrail/backend/logger"
)

var ErrorDisplayIdAlreadyExists = errors.New("usecase: display id already exists")

type UserUseCase struct {
	DB       repository.DBAccesser
	userRepo UserRepository
}

func NewUserUseCase(db repository.DBAccesser, userRepo UserRepository) *UserUseCase {
	return &UserUseCase{
		DB:       db,
		userRepo: userRepo,
	}
}

type UserListResponse struct {
	Users      []*entity.User
	NextCursor entity.ImmutableId
}

func (uc *UserUseCase) ListUsers(ctx context.Context, immutableId entity.ImmutableId, limit int) (*UserListResponse, error) {
	// 次のページがあるかどうかを判定するために、limit+1件取得する
	users, err := uc.userRepo.ListUsers(ctx, uc.DB, immutableId, limit+1)
	if err != nil {
		return nil, err
	}

	nextCursor := ""
	if len(users) > limit {
		// limit を超えた最初の要素を取得
		nextCursor = string(users[limit].ImmutableId)
	}
	// limit までの要素を取得
	users = users[:limit]

	resp := &UserListResponse{
		Users:      users,
		NextCursor: entity.ImmutableId(nextCursor),
	}
	return resp, nil
}

func (uc *UserUseCase) GetByUsername(ctx context.Context, username entity.Username) (*entity.User, error) {
	user, err := uc.userRepo.GetUserByUsername(ctx, uc.DB, username)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, nil
	}

	// TODO: フォロー数等の情報を取得する
	return user, nil
}

func (uc *UserUseCase) Store(ctx context.Context, user *entity.User) (*entity.User, error) {
	tx, err := uc.DB.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}

	user, err = uc.userRepo.StoreUser(ctx, tx, user)
	if err != nil {
		defer func() {
			if err := tx.Rollback(); err != nil {
				logger.FromContent(ctx).Error("failed to rollback transaction: %v", err)
			}
		}()

		if errors.Is(err, repository.ErrorDisplayIdAlreadyExists) {
			return nil, fmt.Errorf("%w: %w", ErrorDisplayIdAlreadyExists, err)
		}

		return nil, err
	}

	if err = tx.Commit(); err != nil {
		return nil, err
	}

	return user, nil
}
