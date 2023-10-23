package usecase

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
)

//go:generate go run github.com/matryer/moq -out moq_test.go . UserRepository
type ReviewRepository interface {
	StoreReview(ctx context.Context, db repository.Executor, review *entity.Review) (*entity.Review, error)
	// GetReviewById(ctx context.Context, db repository.Executor, reviewId string) (*entity.Review, error)
	// GetReviewByAuthorId(ctx context.Context, db repository.Executor, authorId entity.UserId, nextCursor string, limit int) ([]*entity.Review, string, error)
	// UpdateReview(ctx context.Context, db repository.Executor, review *entity.Review) (*entity.Review, error)
	// DeleteReviewById(ctx context.Context, db repository.Executor, reviewId string) error
}

type AlbumRepository interface {
	GetAlbumById(ctx context.Context, albumId string) (*entity.Album, error)
	// GetAlbumTracksById(ctx context.Context, albumId string) ([]*entity.Track, error)
	// GetAlbumByIds(ctx context.Context, albumIds []string) ([]*entity.Album, error)
}

type UserRepository interface {
	StoreUser(ctx context.Context, db repository.Executor, user *entity.User) (*entity.User, error)
	GetUserById(ctx context.Context, db repository.Executor, userId entity.UserId) (*entity.User, error)
	// GetUserByIds(ctx context.Context, db repository.Executor, userIds []entity.UserId) ([]*entity.User, error)
}

// type UserFollowRepository interface {
// 	StoreUserFollow(ctx context.Context, db repository.Executor, userFollow *entity.UserFollow) (*entity.UserFollow, error)
// 	GetUserFollowByUserIds(ctx context.Context, db repository.Executor, sourceId, targetId entity.UserId) ([]*entity.UserFollow, error)
// 	DeleteUserFollow(ctx context.Context, db repository.Executor, userFollow *entity.UserFollow) error
// 	IsFollowing(ctx context.Context, db repository.Executor, sourceId, targetId entity.UserId) (bool, error)
// 	IsFollowed(ctx context.Context, db repository.Executor, sourceId, targetId entity.UserId) (bool, error)
// }
