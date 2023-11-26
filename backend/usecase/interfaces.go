package usecase

import (
	"context"

	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/infra/repository"
)

//go:generate go run github.com/matryer/moq -out moq_test.go . UserRepository
type ReviewRepository interface {
	ListReviews(ctx context.Context, db repository.Executor, reviewId string, limit int) ([]*entity.Review, error)
	GetReviewById(ctx context.Context, db repository.Executor, reviewId string) (*entity.Review, error)
	ListMyReviews(ctx context.Context, db repository.Executor, authorId entity.ImmutableId, reviewId string, limit int) ([]*entity.Review, error)
	StoreReview(ctx context.Context, db repository.Executor, review *entity.Review) (*entity.Review, error)
	UpdateReview(ctx context.Context, db repository.Executor, review *entity.Review) (*entity.Review, error)
	DeleteReview(ctx context.Context, db repository.Executor, reviewId string) error
}

type UserRepository interface {
	ListUsers(ctx context.Context, db repository.Executor, immutableId entity.ImmutableId, limit int) ([]*entity.User, error)
	ListUsersById(ctx context.Context, db repository.Executor, userIds []entity.ImmutableId) ([]*entity.User, error)
	GetUserByImmutableId(ctx context.Context, db repository.Executor, immutableId entity.ImmutableId) (*entity.User, error)
	ListUsersByUsername(ctx context.Context, db repository.Executor, usernames []entity.Username) ([]*entity.User, error)
	GetUserByUsername(ctx context.Context, db repository.Executor, username entity.Username) (*entity.User, error)
	StoreUser(ctx context.Context, db repository.Executor, user *entity.User) (*entity.User, error)
	UpdateUser(ctx context.Context, db repository.Executor, user *entity.User) (*entity.User, error)
}

type FollowRepository interface {
	IsFollowing(ctx context.Context, db repository.Executor, sourceId, targetId entity.ImmutableId) (bool, error)
	StoreFollow(ctx context.Context, db repository.Executor, follow *entity.Follow) (*entity.Follow, error)
	// GetUserFollowByUserIds(ctx context.Context, db repository.Executor, sourceId, targetId entity.UserId) ([]*entity.UserFollow, error)
	// DeleteUserFollow(ctx context.Context, db repository.Executor, userFollow *entity.UserFollow) error
}
