package usecase

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
)

//go:generate go run github.com/matryer/moq -out moq_test.go . UserRepository
type ReviewRepository interface {
	ListReviews(ctx context.Context, db repository.Executor, filter *entity.ReviewFilter) ([]*entity.Review, string, error)
	GetReviewById(ctx context.Context, db repository.Executor, reviewId string) (*entity.Review, error)
	StoreReview(ctx context.Context, db repository.Executor, review *entity.Review) (*entity.Review, error)
	UpdateReview(ctx context.Context, db repository.Executor, review *entity.Review) (*entity.Review, error)
	// DeleteReviewById(ctx context.Context, db repository.Executor, reviewId string) error
}

type AlbumRepository interface {
	ListAlbums(ctx context.Context, albumIds []string) ([]*entity.Album, []*entity.TrackPage, error)
	GetAlbumInfoById(ctx context.Context, albumId string) (*entity.Album, *entity.TrackPage, error)
	// ListAlbumTracksByAlbumId(ctx context.Context, albumId string) ([]*entity.Track, error)
}

type UserRepository interface {
	ListUsers(ctx context.Context, db repository.Executor, filter *entity.UserFilter) ([]*entity.User, entity.UserId, error)
	GetUserById(ctx context.Context, db repository.Executor, userId entity.UserId) (*entity.User, error)
	StoreUser(ctx context.Context, db repository.Executor, user *entity.User) (*entity.User, error)
}

// type UserFollowRepository interface {
// 	StoreUserFollow(ctx context.Context, db repository.Executor, userFollow *entity.UserFollow) (*entity.UserFollow, error)
// 	GetUserFollowByUserIds(ctx context.Context, db repository.Executor, sourceId, targetId entity.UserId) ([]*entity.UserFollow, error)
// 	DeleteUserFollow(ctx context.Context, db repository.Executor, userFollow *entity.UserFollow) error
// 	IsFollowing(ctx context.Context, db repository.Executor, sourceId, targetId entity.UserId) (bool, error)
// 	IsFollowed(ctx context.Context, db repository.Executor, sourceId, targetId entity.UserId) (bool, error)
// }
