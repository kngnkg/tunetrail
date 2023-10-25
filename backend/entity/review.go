package entity

import "time"

type PublishedStatus string

const (
	Published PublishedStatus = "published"
	Draft     PublishedStatus = "draft"
	UnListed  PublishedStatus = "unlisted"
)

type Review struct {
	ReviewId        string          `db:"review_id" validate:"required,uuid4"`
	PublishedStatus PublishedStatus `db:"published_status" validate:"required"`
	Author          *User           `db:"author" validate:"required"`
	Album           *Album          `db:"album" validate:"required"`
	Title           string          `db:"title" validate:"required"`
	Content         string          `db:"content" validate:"required"`
	LikesCount      int
	CreatedAt       time.Time `db:"created_at"`
	UpdatedAt       time.Time `db:"updated_at"`
}

type ReviewFilter struct {
	Page
	PublishedOnly bool
	ReviewIds     []string
	AuthorIds     []UserId
	AlbumIds      []string
}

func NewReviewFilter(cursor string, limit int, publishedOnly bool, reviewIds []string, authorIds []UserId, albumIds []string) *ReviewFilter {
	return &ReviewFilter{
		Page:          *NewPage(cursor, limit),
		PublishedOnly: publishedOnly,
		ReviewIds:     reviewIds,
		AuthorIds:     authorIds,
		AlbumIds:      albumIds,
	}
}
