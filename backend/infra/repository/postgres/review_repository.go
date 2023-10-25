package postgres

import (
	"context"
	"fmt"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/helper"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
	"github.com/kngnkg/tunetrail/backend/logger"
)

type ReviewRepository struct{}

func listReviews(ctx context.Context, db repository.Executor, query string, args ...interface{}) ([]*entity.Review, error) {
	reviews := []*entity.Review{}
	err := db.SelectContext(ctx, &reviews, query, args...)
	if err != nil {
		logger.FromContent(ctx).Error("failed to get reviews.", err)
		return nil, err
	}

	return reviews, nil
}

// handleReviewsNextCursor は、limit を超えた要素がある場合に、次のページがあるかどうかを判定する
func handleReviewsNextCursor(ctx context.Context, reviews []*entity.Review, limit int) ([]*entity.Review, string, error) {
	if len(reviews) <= limit {
		return reviews, "", nil
	}

	// limit を超えた最初の要素を取得
	firstExceedsReview := reviews[limit]

	// limit までの要素と、次のページのカーソルを返す
	return reviews[:limit], firstExceedsReview.ReviewId, nil
}

func (r *ReviewRepository) ListReviews(ctx context.Context, db repository.Executor, filter *entity.ReviewFilter) ([]*entity.Review, string, error) {
	query := `
	SELECT review_id, user_id AS "author.user_id", album_id AS "album.album_id", title, content, published_status, created_at, updated_at
	FROM reviews WHERE 1 = 1`

	placeholderNum := 1
	args := []interface{}{}

	if filter.PublishedOnly {
		query += fmt.Sprintf(" AND published_status = $%d", placeholderNum)
		args = append(args, entity.Published)
		placeholderNum++
	}

	if len(filter.ReviewIds) > 0 {
		query += " AND review_id IN( "
		for _, id := range filter.ReviewIds {
			query += fmt.Sprintf("$%d", placeholderNum)
			args = append(args, id)
			placeholderNum++
		}
		query += ")"
	}

	if len(filter.AuthorIds) > 0 {
		query += " AND user_id IN( "
		for _, id := range filter.AuthorIds {
			query += fmt.Sprintf("$%d", placeholderNum)
			args = append(args, id)
			placeholderNum++
		}
		query = helper.RemoveLastComma(query) + ")"
	}

	if len(filter.AlbumIds) > 0 {
		query += " AND album_id IN( "
		for _, id := range filter.AlbumIds {
			query += fmt.Sprintf("$%d", placeholderNum)
			args = append(args, id)
			placeholderNum++
		}
		query = helper.RemoveLastComma(query) + ")"
	}

	if filter.Cursor != "" {
		query += fmt.Sprintf(" AND created_at <= (SELECT created_at FROM reviews WHERE review_id = $%d)", placeholderNum)
		args = append(args, filter.Cursor)
		placeholderNum++
	}

	query += " ORDER BY created_at DESC"

	query += fmt.Sprintf(" LIMIT $%d;", placeholderNum)
	// 次のページがあるかどうかを判定するために、limit+1件取得する
	args = append(args, filter.Limit+1)

	reviews, err := listReviews(ctx, db, query, args...)
	if err != nil {
		return nil, "", err
	}

	reviews, nextCursor, err := handleReviewsNextCursor(ctx, reviews, filter.Limit)
	if err != nil {
		return nil, "", err
	}

	return reviews, nextCursor, nil
}

func (r *ReviewRepository) GetReviewById(ctx context.Context, db repository.Executor, reviewId string) (*entity.Review, error) {
	query := `
		SELECT review_id, user_id AS "author.user_id", album_id AS "album.album_id", title, content, published_status, created_at, updated_at
		FROM reviews
		WHERE review_id = $1;`

	review := &entity.Review{}
	err := db.GetContext(ctx, review, query, reviewId)
	if err != nil {
		logger.FromContent(ctx).Error("failed to get review by id.", err)
		return nil, err
	}

	return review, nil
}

func (r *ReviewRepository) StoreReview(ctx context.Context, db repository.Executor, review *entity.Review) (*entity.Review, error) {
	query := `
		INSERT INTO reviews (user_id, album_id, title, content, published_status, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
		RETURNING review_id, user_id AS "author.user_id", album_id AS "album.album_id", title, content, published_status, created_at, updated_at;`

	err := db.QueryRowxContext(ctx, query, review.Author.UserId, review.Album.AlbumId, review.Title, review.Content, review.PublishedStatus).
		StructScan(review)
	if err != nil {
		logger.FromContent(ctx).Error("failed to store review.", err)
		return nil, err
	}

	return review, nil
}
