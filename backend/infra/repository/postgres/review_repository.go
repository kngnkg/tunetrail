package postgres

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
	"github.com/kngnkg/tunetrail/backend/logger"
)

type ReviewRepository struct{}

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
