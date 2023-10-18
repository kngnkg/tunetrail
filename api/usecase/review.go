package usecase

import (
	"context"

	"github.com/kngnkg/tunetrail/api/entity"
	"golang.org/x/sync/errgroup"
)

//go:generate go run github.com/matryer/moq -out moq_test.go . ReviewRepository AlbumRepository UserRepository
type ReviewRepository interface {
	Store(ctx context.Context, review *entity.Review) (*entity.Review, error)
	GetById(ctx context.Context, reviewId string) (*entity.Review, error)
	GetByAuthorId(ctx context.Context, authorId entity.UserId, nextCursor string, limit int) ([]*entity.Review, string, error)
}

type AlbumRepository interface {
	GetById(ctx context.Context, albumId string) (*entity.Album, error)
	GetByIds(ctx context.Context, albumIds []string) ([]*entity.Album, error)
}

type UserRepository interface {
	GetById(ctx context.Context, userId entity.UserId) (*entity.User, error)
}

//go:generate go run github.com/cweill/gotests/... -exported -w review_test.go review.go
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

func (uc *ReviewUseCase) GetByAuthorId(ctx context.Context, authorId entity.UserId, nextCursor string, limit int) ([]*entity.Review, string, error) {
	rs, nc, err := uc.reviewRepo.GetByAuthorId(ctx, authorId, nextCursor, limit)
	if err != nil {
		return nil, "", err
	}

	eg, ctx := errgroup.WithContext(ctx)

	// アルバム情報を取得
	eg.Go(func() error {
		aIds := make([]string, len(rs))
		for i, r := range rs {
			aIds[i] = r.Album.AlbumId
		}

		as, err := uc.albumRepo.GetByIds(ctx, aIds)
		if err != nil {
			return err
		}

		for _, r := range rs {
			for _, a := range as {
				if r.Album.AlbumId == a.AlbumId {
					r.Album = a
				}
			}
		}

		return nil
	})

	// ユーザー情報を取得
	eg.Go(func() error {
		rs, err = uc.fillUserInfo(ctx, rs)
		if err != nil {
			return err
		}

		return nil
	})

	if err := eg.Wait(); err != nil {
		return nil, "", err
	}

	return rs, nc, nil
}

func (uc *ReviewUseCase) fillUserInfo(ctx context.Context, reviews []*entity.Review) ([]*entity.Review, error) {
	eg, ctx := errgroup.WithContext(ctx)

	for _, r := range reviews {
		r := r
		eg.Go(func() error {
			author, err := uc.userRepo.GetById(ctx, r.Author.UserId)
			if err != nil {
				return err
			}

			r.Author = author

			return nil
		})
	}

	if err := eg.Wait(); err != nil {
		return nil, err
	}

	return reviews, nil
}
