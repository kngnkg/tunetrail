package usecase

import (
	"context"

	"github.com/kngnkg/tunetrail/api/entity"
)

//go:generate go run github.com/matryer/moq -out moq_test.go . ReviewRepository AlbumRepository UserRepository
type ReviewRepository interface {
	Store(ctx context.Context, review *entity.Review) (*entity.Review, error)
	GetById(ctx context.Context, reviewId string) (*entity.Review, error)
}

type AlbumRepository interface {
	GetById(ctx context.Context, albumId string) (*entity.Album, error)
}

type UserRepository interface {
	GetById(ctx context.Context, userId entity.UserId) (*entity.User, error)
}

//go:generate go run github.com/cweill/gotests/... -all -w review_test.go review.go
type ReviewUseCase struct {
	reviewRepo ReviewRepository
	albumRepo  AlbumRepository
	userRepo   UserRepository
}

func (uc *ReviewUseCase) Store(ctx context.Context, review *entity.Review) (*entity.Review, error) {
	r, err := uc.reviewRepo.Store(ctx, review)
	if err != nil {
		return nil, err
	}

	author, err := uc.userRepo.GetById(ctx, r.Author.UserId)
	if err != nil {
		return nil, err
	}

	r.Author = author

	album, err := uc.albumRepo.GetById(ctx, r.Album.AlbumId)
	if err != nil {
		return nil, err
	}

	r.Album = album
	return r, nil
}

func (uc *ReviewUseCase) GetById(ctx context.Context, reviewId string) (*entity.Review, error) {
	r, err := uc.reviewRepo.GetById(ctx, reviewId)
	if err != nil {
		return nil, err
	}

	author, err := uc.userRepo.GetById(ctx, r.Author.UserId)
	if err != nil {
		return nil, err
	}

	r.Author = author

	album, err := uc.albumRepo.GetById(ctx, r.Album.AlbumId)
	if err != nil {
		return nil, err
	}

	r.Album = album
	return r, nil
}
