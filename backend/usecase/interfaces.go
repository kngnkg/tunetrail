package usecase

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
)

//go:generate go run github.com/matryer/moq -out moq_test.go . UserRepository
type ReviewRepository interface {
	ListReviews(ctx context.Context, db repository.Executor, reviewId string, limit int) ([]*entity.Review, error)
	// ListReviewsByUsername(ctx context.Context, db repository.Executor, cursor string, limit int, usernames []*entity.Username) ([]*entity.Review, error)
	// ListReviewsByAlbumId(ctx context.Context, db repository.Executor, cursor string, limit int, usernames []*entity.Username) ([]*entity.Review, error)
	GetReviewById(ctx context.Context, db repository.Executor, reviewId string) (*entity.Review, error)
	StoreReview(ctx context.Context, db repository.Executor, review *entity.Review) (*entity.Review, error)
	UpdateReview(ctx context.Context, db repository.Executor, review *entity.Review) (*entity.Review, error)
	DeleteReview(ctx context.Context, db repository.Executor, reviewId string) error
}

type UserRepository interface {
	ListUsers(ctx context.Context, db repository.Executor, immutableId entity.ImmutableId, limit int) ([]*entity.User, error)
	ListUsersById(ctx context.Context, db repository.Executor, userIds []entity.ImmutableId) ([]*entity.User, error)
	GetUserByUsername(ctx context.Context, db repository.Executor, username entity.Username) (*entity.User, error)
	GetUserByImmutableId(ctx context.Context, db repository.Executor, immutableId entity.ImmutableId) (*entity.User, error)
	StoreUser(ctx context.Context, db repository.Executor, user *entity.User) (*entity.User, error)
	UpdateUser(ctx context.Context, db repository.Executor, user *entity.User) (*entity.User, error)
}

// type FollowRepository interface {
// 	StoreUserFollow(ctx context.Context, db repository.Executor, userFollow *entity.UserFollow) (*entity.UserFollow, error)
// 	GetUserFollowByUserIds(ctx context.Context, db repository.Executor, sourceId, targetId entity.UserId) ([]*entity.UserFollow, error)
// 	DeleteUserFollow(ctx context.Context, db repository.Executor, userFollow *entity.UserFollow) error
// 	IsFollowing(ctx context.Context, db repository.Executor, sourceId, targetId entity.UserId) (bool, error)
// 	IsFollowed(ctx context.Context, db repository.Executor, sourceId, targetId entity.UserId) (bool, error)
// }
