package usecase

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
)

//go:generate go run github.com/matryer/moq -out moq_test.go . ReviewRepository AlbumRepository UserRepository UserFollowRepository
type ReviewRepository interface {
	Store(ctx context.Context, review *entity.Review) (*entity.Review, error)
	GetById(ctx context.Context, reviewId string) (*entity.Review, error)
	GetByAuthorId(ctx context.Context, authorId entity.UserId, nextCursor string, limit int) ([]*entity.Review, string, error)
	Update(ctx context.Context, review *entity.Review) (*entity.Review, error)
	DeleteById(ctx context.Context, reviewId string) error
}

type AlbumRepository interface {
	GetById(ctx context.Context, albumId string) (*entity.Album, error)
	GetByIds(ctx context.Context, albumIds []string) ([]*entity.Album, error)
}

type UserRepository interface {
	GetById(ctx context.Context, userId entity.UserId) (*entity.User, error)
	GetByIds(ctx context.Context, userIds []entity.UserId) ([]*entity.User, error)
}

type UserFollowRepository interface {
	Store(ctx context.Context, userFollow *entity.UserFollow) (*entity.UserFollow, error)
	GetByUserIds(ctx context.Context, sourceId, targetId entity.UserId) ([]*entity.UserFollow, error)
	Delete(ctx context.Context, userFollow *entity.UserFollow) error
	IsFollowing(ctx context.Context, sourceId, targetId entity.UserId) (bool, error)
	IsFollowed(ctx context.Context, sourceId, targetId entity.UserId) (bool, error)
}
