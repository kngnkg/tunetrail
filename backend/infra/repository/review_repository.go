package repository

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/logger"
)

type ReviewRepository struct{}

func reviewPagenationQuery(query string, cursor string, limit int, args []interface{}) (string, []interface{}) {
	if cursor != "" {
		query += fmt.Sprintf(" AND created_at <= (SELECT created_at FROM reviews WHERE review_id = $%d)", len(args)+1)
		args = append(args, cursor)
	}

	query += fmt.Sprintf(" ORDER BY created_at DESC LIMIT $%d;", len(args)+1)
	args = append(args, limit)

	return query, args
}

func (r *ReviewRepository) ListReviews(ctx context.Context, db Executor, reviewId string, limit int) ([]*entity.Review, error) {
	query := `
	SELECT review_id, user_id AS "author.user_id", album_id, title, content, published_status, created_at, updated_at
	FROM reviews WHERE published_status = 'published'`

	args := []interface{}{}

	query, args = reviewPagenationQuery(query, reviewId, limit, args)

	reviews := []*entity.Review{}
	err := db.SelectContext(ctx, &reviews, query, args...)
	if err != nil {
		logger.FromContext(ctx).Error("failed to get reviews.", err)
		return nil, err
	}

	return reviews, nil
}

func (r *ReviewRepository) ListMyReviews(ctx context.Context, db Executor, authorId entity.ImmutableId, reviewId string, limit int) ([]*entity.Review, error) {
	query := `
	SELECT review_id, user_id AS "author.user_id", album_id, title, content, published_status, created_at, updated_at
	FROM reviews WHERE 1 = 1`

	args := []interface{}{}

	query += fmt.Sprintf(" AND user_id = $%d", len(args)+1)
	args = append(args, authorId)

	query, args = reviewPagenationQuery(query, reviewId, limit, args)

	reviews := []*entity.Review{}
	err := db.SelectContext(ctx, &reviews, query, args...)
	if err != nil {
		logger.FromContext(ctx).Error("failed to get reviews.", err)
		return nil, err
	}

	return reviews, nil
}

func (r *ReviewRepository) ListReviewsByUserId(ctx context.Context, db Executor, userId entity.ImmutableId, reviewId string, limit int) ([]*entity.Review, error) {
	query := `
	SELECT review_id, user_id AS "author.user_id", album_id, title, content, published_status, created_at, updated_at
	FROM reviews
	WHERE user_id = $1`

	args := []interface{}{userId}

	query, args = reviewPagenationQuery(query, reviewId, limit, args)

	reviews := []*entity.Review{}
	err := db.SelectContext(ctx, &reviews, query, args...)
	if err != nil {
		logger.FromContext(ctx).Error("failed to get reviews.", err)
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
		logger.FromContext(ctx).Error("failed to store review.", err)
		return nil, err
	}

	return review, nil
}

func (r *ReviewRepository) UpdateReview(ctx context.Context, db Executor, review *entity.Review) (*entity.Review, error) {
	query := `
		UPDATE reviews
		SET album_id = $1, title = $2, content = $3, published_status = $4, updated_at = NOW()
		WHERE review_id = $5
		RETURNING review_id, user_id AS "author.user_id", album_id , title, content, published_status, created_at, updated_at;`

	err := db.QueryRowxContext(ctx, query, review.AlbumId, review.Title, review.Content, review.PublishedStatus, review.ReviewId).
		StructScan(review)
	if err != nil {
		logger.FromContext(ctx).Error("failed to update review.", err)
		return nil, err
	}

	return review, nil
}

func (r *ReviewRepository) DeleteReview(ctx context.Context, db Executor, reviewId string) error {
	query := `DELETE FROM reviews WHERE review_id = $1;`

	_, err := db.ExecContext(ctx, query, reviewId)
	if err != nil {
		logger.FromContext(ctx).Error("failed to delete review.", err)
		return err
	}

	return nil
}
