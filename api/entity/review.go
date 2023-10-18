package entity

import "time"

type PublishedStatus string

const (
	Published PublishedStatus = "published"
	Draft     PublishedStatus = "draft"
	UnListed  PublishedStatus = "unlisted"
)

type Review struct {
	ReviewId        string
	PublishedStatus PublishedStatus
	Author          *User
	Album           *Album
	Title           string
	Content         string
	LikesCount      int
	// Liked      bool
	CreatedAt time.Time
	UpdatedAt time.Time
}
