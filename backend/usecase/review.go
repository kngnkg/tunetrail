package usecase

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
	"github.com/kngnkg/tunetrail/backend/logger"
)

type ReviewUseCase struct {
	DB         repository.DBAccesser
	reviewRepo ReviewRepository
	albumRepo  AlbumRepository
	userRepo   UserRepository
}

func NewReviewUseCase(db repository.DBAccesser, rr ReviewRepository, ar AlbumRepository, ur UserRepository) *ReviewUseCase {
	return &ReviewUseCase{
		DB:         db,
		reviewRepo: rr,
		albumRepo:  ar,
		userRepo:   ur,
	}
}

type ReviewResponse struct {
	Review    *entity.Review
	TrackPage *entity.TrackPage
}

type ReviewListResponse struct {
	Reviews    []*entity.Review
	NextCursor string
}

func (uc *ReviewUseCase) ListReviews(ctx context.Context, reviewIds []string, userIds []entity.UserId, albumIds []string, cursor string, limit int) (*ReviewListResponse, error) {
	// レビュー情報を取得する
	rf := entity.NewReviewFilter(cursor, limit, true, reviewIds, userIds, albumIds)
	rs, nc, err := uc.reviewRepo.ListReviews(ctx, uc.DB, rf)
	if err != nil {
		return nil, err
	}

	// TODO: 並行処理にする

	// 取得するユーザーIDのスライスを作成する
	uids := make([]entity.UserId, len(rs))
	for i, r := range rs {
		uids[i] = r.Author.UserId
	}

	// ユーザー情報を取得する
	uf := entity.NewUserFilter("", len(rs), uids, nil)
	us, _, err := uc.userRepo.ListUsers(ctx, uc.DB, uf)
	if err != nil {
		return nil, err
	}

	// ユーザー情報を一旦マップに格納する
	userMap := make(map[entity.UserId]*entity.User)
	for _, u := range us {
		userMap[u.UserId] = u
	}

	// 取得するアルバムIDのスライスを作成する
	aids := make([]string, len(rs))
	for i, r := range rs {
		aids[i] = r.Album.AlbumId
	}

	// アルバム情報を取得する
	as, _, err := uc.albumRepo.ListAlbums(ctx, aids)
	if err != nil {
		return nil, err
	}

	// アルバム情報を一旦マップに格納する
	albumMap := make(map[string]*entity.Album)
	for _, a := range as {
		albumMap[a.AlbumId] = a
	}

	for _, r := range rs {
		// ユーザー情報を埋め込む
		if u, ok := userMap[r.Author.UserId]; ok {
			r.Author = u
		}

		// アルバム情報を埋め込む
		if album, ok := albumMap[r.Album.AlbumId]; ok {
			r.Album = album
		}
	}

	resp := &ReviewListResponse{
		Reviews:    rs,
		NextCursor: nc,
	}
	return resp, nil
}

func (uc *ReviewUseCase) GetById(ctx context.Context, reviewId string) (*ReviewResponse, error) {
	r, err := uc.reviewRepo.GetReviewById(ctx, uc.DB, reviewId)
	if err != nil {
		return nil, err
	}

	author, err := uc.userRepo.GetUserById(ctx, uc.DB, r.Author.UserId)
	if err != nil {
		return nil, err
	}

	album, tp, err := uc.albumRepo.GetAlbumInfoById(ctx, r.Album.AlbumId)
	if err != nil {
		return nil, err
	}

	return toReviewResponse(r, author, album, tp), nil
}

func toReviewResponse(r *entity.Review, author *entity.User, album *entity.Album, tp *entity.TrackPage) *ReviewResponse {
	return &ReviewResponse{
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
		TrackPage: tp,
	}
}

func (uc *ReviewUseCase) Store(ctx context.Context, authorId entity.UserId, albumId, title, content string, status entity.PublishedStatus) (*ReviewResponse, error) {
	review := &entity.Review{
		PublishedStatus: status,
		Author: &entity.User{
			UserId: authorId,
		},
		Album: &entity.Album{
			AlbumId: albumId,
		},
		Title:   title,
		Content: content,
	}

	tx, err := uc.DB.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}

	r, err := uc.reviewRepo.StoreReview(ctx, tx, review)
	if err != nil {
		// TODO: ロールバックのエラーハンドリング
		if err = tx.Rollback(); err != nil {
			logger.FromContent(ctx).Error("failed to rollback transaction: %v", err)
		}
		logger.FromContent(ctx).Error("failed to store review. transaction rollbacked: %v", err)
		return nil, err
	}

	// TODO: Commitのエラーハンドリング
	if err = tx.Commit(); err != nil {
		return nil, err
	}

	author, err := uc.userRepo.GetUserById(ctx, uc.DB, r.Author.UserId)
	if err != nil {
		return nil, err
	}

	// TODO: トラック情報を取得する
	album, tp, err := uc.albumRepo.GetAlbumInfoById(ctx, r.Album.AlbumId)
	if err != nil {
		return nil, err
	}

	return toReviewResponse(r, author, album, tp), nil
}

func (uc *ReviewUseCase) Update(ctx context.Context, reviewId string, title string, content string, publishedStatus entity.PublishedStatus) (*ReviewResponse, error) {
	r := &entity.Review{
		ReviewId:        reviewId,
		Title:           title,
		Content:         content,
		PublishedStatus: publishedStatus,
	}

	tx, err := uc.DB.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}

	r, err = uc.reviewRepo.UpdateReview(ctx, tx, r)
	if err != nil {
		// TODO: ロールバックのエラーハンドリング
		if err = tx.Rollback(); err != nil {
			logger.FromContent(ctx).Error("failed to rollback transaction: %v", err)
		}
		logger.FromContent(ctx).Error("failed to store review. transaction rollbacked: %v", err)
		return nil, err
	}

	// TODO: Commitのエラーハンドリング
	if err = tx.Commit(); err != nil {
		return nil, err
	}

	author, err := uc.userRepo.GetUserById(ctx, uc.DB, r.Author.UserId)
	if err != nil {
		return nil, err
	}

	// TODO: トラック情報を取得する
	album, tp, err := uc.albumRepo.GetAlbumInfoById(ctx, r.Album.AlbumId)
	if err != nil {
		return nil, err
	}

	return toReviewResponse(r, author, album, tp), nil
}

func (uc *ReviewUseCase) DeleteReview(ctx context.Context, reviewId string) error {
	tx, err := uc.DB.BeginTxx(ctx, nil)
	if err != nil {
		return err
	}

	err = uc.reviewRepo.DeleteReview(ctx, tx, reviewId)
	if err != nil {
		// TODO: ロールバックのエラーハンドリング
		if err = tx.Rollback(); err != nil {
			logger.FromContent(ctx).Error("failed to rollback transaction: %v", err)
		}
		logger.FromContent(ctx).Error("failed to store review. transaction rollbacked: %v", err)
		return err
	}

	// TODO: Commitのエラーハンドリング
	return tx.Commit()
}
