package repository

import (
	"context"

	"github.com/kngnkg/foderee/backend/entity"
)

type LikeRepository struct{}

func (r *LikeRepository) IsLiked(ctx context.Context, db Executor, immutableId entity.ImmutableId, reviewId string) (bool, error) {
	query := `
		SELECT EXISTS(
			SELECT 1 FROM likes
			WHERE user_id = $1 AND review_id = $2 LIMIT 1);`

	var exists bool
	err := db.GetContext(ctx, &exists, query, immutableId, reviewId)
	if err != nil {
		return false, err
	}

	return exists, nil
}

func (r *LikeRepository) GetLikesCountByReviewId(ctx context.Context, db Executor, reviewId string) (int, error) {
	query := `
		SELECT COUNT(*) FROM likes
		WHERE review_id = $1;`

	var count int
	err := db.GetContext(ctx, &count, query, reviewId)
	if err != nil {
		return 0, err
	}

	return count, nil
}

func (r *LikeRepository) StoreLike(ctx context.Context, db Executor, like *entity.Like) (*entity.Like, error) {
	query := `
		INSERT INTO likes (user_id, review_id, created_at, updated_at)
		VALUES ($1, $2, now(), now())
		RETURNING user_id, review_id, created_at, updated_at;`

	err := db.GetContext(ctx, like, query, like.ImmutableId, like.ReviewId)
	if err != nil {
		return nil, err
	}

	return like, nil
}

func (r *LikeRepository) DeleteLike(ctx context.Context, db Executor, like *entity.Like) (*entity.Like, error) {
	query := `
		DELETE FROM likes
		WHERE user_id = $1 AND review_id = $2
		RETURNING user_id, review_id, created_at, updated_at;`

	err := db.GetContext(ctx, like, query, like.ImmutableId, like.ReviewId)
	if err != nil {
		return nil, err
	}

	return like, nil
}

func (r *LikeRepository) ListLikedReviews(ctx context.Context, db Executor, authorId entity.ImmutableId, reviewId string, limit int) ([]*entity.Review, error) {
	query := `
		SELECT r.review_id, r.user_id AS "author.user_id", r.album_id, r.title, r.content, r.published_status, r.created_at, r.updated_at
		FROM reviews r
		INNER JOIN likes l ON r.review_id = l.review_id
		WHERE l.user_id = $1`

	args := []interface{}{authorId}

	query, args = reviewPagenationQuery(query, reviewId, limit, args)

	reviews := []*entity.Review{}
	err := db.SelectContext(ctx, &reviews, query, args...)
	if err != nil {
		return nil, err
	}

	return reviews, nil
}
