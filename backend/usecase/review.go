package usecase

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	"golang.org/x/sync/errgroup"
)

//go:generate go run github.com/cweill/gotests/... -exported -w review_test.go review.go
type ReviewUseCase struct {
	reviewRepo ReviewRepository
	albumRepo  AlbumRepository
	userRepo   UserRepository
}

type ReviewResponse struct {
	Review *entity.Review
}

type ReviewListResponse struct {
	Reviews    []*entity.Review
	NextCursor string
}

func (uc *ReviewUseCase) Store(ctx context.Context, review *entity.Review) (*ReviewResponse, error) {
	r, err := uc.reviewRepo.Store(ctx, review)
	if err != nil {
		return nil, err
	}

	author, err := uc.userRepo.GetById(ctx, r.Author.UserId)
	if err != nil {
		return nil, err
	}

	album, err := uc.albumRepo.GetById(ctx, r.Album.AlbumId)
	if err != nil {
		return nil, err
	}

	resp := &ReviewResponse{
		Review: &entity.Review{
			ReviewId:        r.ReviewId,
			PublishedStatus: r.PublishedStatus,
			Author:          author,
			Album:           album,
			Title:           r.Title,
			Content:         r.Content,
			LikesCount:      r.LikesCount,
			CreatedAt:       r.CreatedAt,
			UpdatedAt:       r.UpdatedAt,
		},
	}
	return resp, nil
}

func (uc *ReviewUseCase) GetById(ctx context.Context, reviewId string) (*ReviewResponse, error) {
	r, err := uc.reviewRepo.GetById(ctx, reviewId)
	if err != nil {
		return nil, err
	}

	author, err := uc.userRepo.GetById(ctx, r.Author.UserId)
	if err != nil {
		return nil, err
	}

	album, err := uc.albumRepo.GetById(ctx, r.Album.AlbumId)
	if err != nil {
		return nil, err
	}

	resp := &ReviewResponse{
		Review: &entity.Review{
			ReviewId:        r.ReviewId,
			PublishedStatus: r.PublishedStatus,
			Author:          author,
			Album:           album,
			Title:           r.Title,
			Content:         r.Content,
			LikesCount:      r.LikesCount,
			CreatedAt:       r.CreatedAt,
			UpdatedAt:       r.UpdatedAt,
		},
	}
	return resp, nil
}

func (uc *ReviewUseCase) GetByAuthorId(ctx context.Context, authorId entity.UserId, nextCursor string, limit int) (*ReviewListResponse, error) {
	rs, nc, err := uc.reviewRepo.GetByAuthorId(ctx, authorId, nextCursor, limit)
	if err != nil {
		return nil, err
	}

	// アルバムIDのスライスを作成する
	aIds := make([]string, len(rs))
	for i, r := range rs {
		aIds[i] = r.Album.AlbumId
	}

	// 取得済みのアルバム情報を格納するマップ
	albumMap := make(map[string]*entity.Album)

	eg, ctx := errgroup.WithContext(ctx)
	eg.Go(func() error {
		// アルバム情報を取得する
		as, err := uc.albumRepo.GetByIds(ctx, aIds)
		if err != nil {
			return err
		}

		// 一旦マップに格納する
		for _, a := range as {
			albumMap[a.AlbumId] = a
		}

		return nil
	})

	var author *entity.User
	// ユーザー情報を取得する
	eg.Go(func() error {
		a, err := uc.userRepo.GetById(ctx, authorId)
		if err != nil {
			return err
		}

		author = a
		return nil
	})

	if err := eg.Wait(); err != nil {
		return nil, err
	}

	for _, r := range rs {
		// アルバム情報を埋め込む
		if album, ok := albumMap[r.Album.AlbumId]; ok {
			r.Album = album
		}

		// ユーザー情報を埋め込む
		r.Author = author
	}

	resp := &ReviewListResponse{
		Reviews:    rs,
		NextCursor: nc,
	}
	return resp, nil
}

func (uc *ReviewUseCase) Update(ctx context.Context, review *entity.Review) (*ReviewResponse, error) {
	r, err := uc.reviewRepo.Update(ctx, review)
	if err != nil {
		return nil, err
	}

	author, err := uc.userRepo.GetById(ctx, r.Author.UserId)
	if err != nil {
		return nil, err
	}

	album, err := uc.albumRepo.GetById(ctx, r.Album.AlbumId)
	if err != nil {
		return nil, err
	}

	resp := &ReviewResponse{
		Review: &entity.Review{
			ReviewId:        r.ReviewId,
			PublishedStatus: r.PublishedStatus,
			Author:          author,
			Album:           album,
			Title:           r.Title,
			Content:         r.Content,
			LikesCount:      r.LikesCount,
			CreatedAt:       r.CreatedAt,
			UpdatedAt:       r.UpdatedAt,
		},
	}
	return resp, nil
}

func (uc *ReviewUseCase) DeleteById(ctx context.Context, reviewId string) error {
	return uc.reviewRepo.DeleteById(ctx, reviewId)
}
