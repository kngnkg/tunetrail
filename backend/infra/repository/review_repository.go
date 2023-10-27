package repository

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/helper"
	"github.com/kngnkg/tunetrail/backend/logger"
)

type ReviewRepository struct{}

// // handleReviewsNextCursor は、limit を超えた要素がある場合に、次のページがあるかどうかを判定する
// func handleReviewsNextCursor(ctx context.Context, reviews []*entity.Review, limit int) ([]*entity.Review, string, error) {
// 	if len(reviews) <= limit {
// 		return reviews, "", nil
// 	}

// 	// limit を超えた最初の要素を取得
// 	firstExceedsReview := reviews[limit]

// 	// limit までの要素と、次のページのカーソルを返す
// 	return reviews[:limit], firstExceedsReview.ReviewId, nil
// }

func (r *ReviewRepository) ListReviewsById(ctx context.Context, db Executor, reviewIds []string) ([]*entity.Review, error) {
	query := `
	SELECT review_id, user_id AS "author.user_id", album_id, title, content, published_status, created_at, updated_at
	FROM reviews WHERE published_status = 'published'`

	placeholderNum := 1
	args := []interface{}{}

	if len(reviewIds) > 0 {
		query += " AND review_id IN("
		for _, id := range reviewIds {
			query += fmt.Sprintf(" $%d,", placeholderNum)
			args = append(args, id)
			placeholderNum++
		}
		query = helper.RemoveLastComma(query) + ")"
	}

	query += " ORDER BY created_at DESC"

	reviews := []*entity.Review{}
	err := db.SelectContext(ctx, &reviews, query, args...)
	if err != nil {
		logger.FromContent(ctx).Error("failed to get reviews.", err)
		return nil, err
	}

	return reviews, nil
}

func (r *ReviewRepository) GetReviewById(ctx context.Context, db Executor, reviewId string) (*entity.Review, error) {
	query := `
		SELECT review_id, user_id AS "author.user_id", album_id , title, content, published_status, created_at, updated_at
		FROM reviews
		WHERE review_id = $1;`

	review := &entity.Review{}
	err := db.GetContext(ctx, review, query, reviewId)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return review, nil
}

func (r *ReviewRepository) StoreReview(ctx context.Context, db Executor, review *entity.Review) (*entity.Review, error) {
	query := `
		INSERT INTO reviews (user_id, album_id, title, content, published_status, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
		RETURNING review_id, user_id AS "author.user_id", album_id , title, content, published_status, created_at, updated_at;`

	err := db.QueryRowxContext(ctx, query, review.Author.ImmutableId, review.AlbumId, review.Title, review.Content, review.PublishedStatus).
		StructScan(review)
	if err != nil {
		logger.FromContent(ctx).Error("failed to store review.", err)
		return nil, err
	}

	return review, nil
}

func (r *ReviewRepository) UpdateReview(ctx context.Context, db Executor, review *entity.Review) (*entity.Review, error) {
	query := `
		UPDATE reviews
		SET title = $1, content = $2, published_status = $3, updated_at = NOW()
		WHERE review_id = $4
		RETURNING review_id, user_id AS "author.user_id", album_id , title, content, published_status, created_at, updated_at;`

	err := db.QueryRowxContext(ctx, query, review.Title, review.Content, review.PublishedStatus, review.ReviewId).
		StructScan(review)
	if err != nil {
		logger.FromContent(ctx).Error("failed to update review.", err)
		return nil, err
	}

	return review, nil
}

func (r *ReviewRepository) DeleteReview(ctx context.Context, db Executor, reviewId string) error {
	query := `DELETE FROM reviews WHERE review_id = $1;`

	_, err := db.ExecContext(ctx, query, reviewId)
	if err != nil {
		logger.FromContent(ctx).Error("failed to delete review.", err)
		return err
	}

	return nil
}
