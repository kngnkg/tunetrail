package usecase

import (
	"context"

	"github.com/kngnkg/tunetrail/api/entity"
)

//go:generate go run github.com/matryer/moq -out moq_test.go . ReviewRepository AlbumRepository
type ReviewRepository interface {
	Store(ctx context.Context, review *entity.Review) error
	GetById(ctx context.Context, reviewId string) (*entity.Review, error)
}

type AlbumRepository interface {
	GetById(ctx context.Context, albumId string) (*entity.Album, error)
}

//go:generate go run github.com/cweill/gotests/... -all -w review_test.go review.go
type ReviewUseCase struct {
	reviewRepo ReviewRepository
	albumRepo  AlbumRepository
}

func (uc *ReviewUseCase) Store(ctx context.Context, review *entity.Review) error {
	return uc.reviewRepo.Store(ctx, review)
}

func (uc *ReviewUseCase) GetById(ctx context.Context, reviewId string) (*entity.Review, error) {
	review, err := uc.reviewRepo.GetById(ctx, reviewId)
	if err != nil {
		return nil, err
	}

	albumId := review.Album.AlbumId
	album, err := uc.albumRepo.GetById(ctx, albumId)
	if err != nil {
		return nil, err
	}

	review.Album = album
	return review, nil
}
