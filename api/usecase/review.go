package usecase

import (
	"context"

	"github.com/kngnkg/tunetrail/api/entity"
	"github.com/kngnkg/tunetrail/api/logger"
	"golang.org/x/sync/errgroup"
)

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

	// ユーザー情報を取得する
	rs, err = uc.fillUserInfo(ctx, rs)
	if err != nil {
		return nil, "", err
	}

	if err := eg.Wait(); err != nil {
		return nil, "", err
	}

	// アルバム情報を埋め込む
	for _, r := range rs {
		if album, ok := albumMap[r.Album.AlbumId]; ok {
			r.Album = album
		}
	}

	return rs, nc, nil
}

func (uc *ReviewUseCase) Update(ctx context.Context, review *entity.Review) (*entity.Review, error) {
	r, err := uc.reviewRepo.Update(ctx, review)
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

func (uc *ReviewUseCase) DeleteById(ctx context.Context, reviewId string) error {
	return uc.reviewRepo.DeleteById(ctx, reviewId)
}

func (uc *ReviewUseCase) fillUserInfo(ctx context.Context, reviews []*entity.Review) ([]*entity.Review, error) {
	eg, ctx := errgroup.WithContext(ctx)

	// 取得済みのユーザー情報を格納するマップ
	authorMap := make(map[entity.UserId]*entity.User)

	authorCh := make(chan *entity.User, len(reviews))
	for _, r := range reviews {
		review := r
		eg.Go(func() error {
			author, err := uc.userRepo.GetById(ctx, review.Author.UserId)
			if err != nil {
				return err
			}

			authorCh <- author
			return nil
		})
	}

	// デッドロックを防ぐために、別のゴルーチンでチャネルを閉じる
	go func(ctx context.Context) {
		if err := eg.Wait(); err != nil {
			logger.FromContent(ctx).Error("failed to wait for user retrieval goroutines", err)
			return
		}

		close(authorCh)
	}(ctx)

	// チャネルから取り出す
	for user := range authorCh {
		authorMap[user.UserId] = user
	}

	// ユーザー情報を埋め込む
	for _, r := range reviews {
		if user, ok := authorMap[r.Author.UserId]; ok {
			r.Author = user
		}
	}
	return reviews, nil
}
