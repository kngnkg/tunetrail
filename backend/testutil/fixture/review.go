package fixture

import (
	"math/rand"
	"time"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/testutil"
)

func Review(r *entity.Review) *entity.Review {
	result := &entity.Review{
		ReviewId:        testutil.GenRandomUUID(),
		PublishedStatus: genRandomPublishedStatus(),
		Author:          Author(nil),
		AlbumId:         testutil.GenRamdomString(22),
		Title:           "title",
		Content:         "<h1>content</h1>",
		LikesCount:      rand.Int(),
		CreatedAt:       time.Now(),
		UpdatedAt:       time.Now(),
	}
	if r == nil {
		return result
	}
	if r.ReviewId != "" {
		result.ReviewId = r.ReviewId
	}
	if r.PublishedStatus != "" {
		result.PublishedStatus = r.PublishedStatus
	}
	if r.Author != nil {
		result.Author = r.Author
	}
	if r.AlbumId != "" {
		result.AlbumId = r.AlbumId
	}
	if r.Title != "" {
		result.Title = r.Title
	}
	if r.Content != "" {
		result.Content = r.Content
	}
	if r.LikesCount != 0 {
		result.LikesCount = r.LikesCount
	}
	if !r.CreatedAt.IsZero() {
		result.CreatedAt = r.CreatedAt
	}
	if !r.UpdatedAt.IsZero() {
		result.UpdatedAt = r.UpdatedAt
	}
	return result
}

func genRandomPublishedStatus() entity.PublishedStatus {
	switch rand.Intn(3) {
	case 0:
		return entity.Published
	case 1:
		return entity.Draft
	case 2:
		return entity.UnListed
	default:
		return entity.Published
	}
}
