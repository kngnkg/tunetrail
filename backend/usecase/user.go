package usecase

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
	"github.com/kngnkg/tunetrail/backend/logger"
)

type UserUseCase struct {
	DB       repository.DBAccesser
	userRepo UserRepository
	// userFollowRepo UserFollowRepository
}

func NewUserUseCase(db repository.DBAccesser, userRepo UserRepository) *UserUseCase {
	return &UserUseCase{
		DB:       db,
		userRepo: userRepo,
		// userFollowRepo: userFollowRepo,
	}
}

type UserResponse struct {
	UserId         entity.UserId
	DisplayId      string
	Name           string
	AvatarUrl      string
	Bio            string
	FollowersCount int
	FollowingCount int
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

func NewUserResponse(user *entity.User) *UserResponse {
	return &UserResponse{
		UserId:         user.UserId,
		DisplayId:      user.DisplayId,
		Name:           user.Name,
		AvatarUrl:      user.AvatarUrl,
		Bio:            user.Bio,
		FollowersCount: user.FollowersCount,
		FollowingCount: user.FollowingCount,
		CreatedAt:      user.CreatedAt,
		UpdatedAt:      user.UpdatedAt,
	}
}

var ErrorDisplayIdAlreadyExists = errors.New("usecase: display id already exists")

func (uc *UserUseCase) Store(ctx context.Context, user *entity.User) (*UserResponse, error) {
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

	resp := NewUserResponse(user)
	return resp, nil
}

func (uc *UserUseCase) GetById(ctx context.Context, userId entity.UserId) (*UserResponse, error) {
	user, err := uc.userRepo.GetUserById(ctx, uc.DB, userId)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, nil
	}

	// TODO: フォロー数等の情報を取得する
	resp := NewUserResponse(user)
	return resp, nil
}

// func (uc *UserUseCase) GetFollowersById(ctx context.Context, sourceId, targetId entity.UserId, nextCursor string, limit int) ([]*UserResponse, error) {
// 	ufs, err := uc.userFollowRepo.GetUserFollowByUserIds(ctx, uc.DB, sourceId, targetId)
// 	if err != nil {
// 		return nil, err
// 	}

// 	var followerIds []entity.UserId
// 	for _, uf := range ufs {
// 		followerIds = append(followerIds, uf.UserId)
// 	}

// 	users, err := uc.userRepo.GetUserByIds(ctx, uc.DB, followerIds)
// 	if err != nil {
// 		return nil, err
// 	}

// 	var resps []*UserResponse
// 	for _, user := range users {
// 		resps = append(resps, NewUserResponse(user))
// 	}

// 	return resps, nil
// }
