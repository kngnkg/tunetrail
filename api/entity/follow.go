package entity

import "time"

type UserFollow struct {
	UserId     UserId
	FolloweeId UserId
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

type RelationType string

const (
	RelationTypeFollowing RelationType = "following"
	RelationTypeFollowed  RelationType = "followed"
	RelationTypeNone      RelationType = "none"
)

type Relationships []RelationType
