package entity

import "time"

type UserFollow struct {
	UserImmutableId     ImmutableId
	FolloweeImmutableId ImmutableId
	CreatedAt           time.Time
	UpdatedAt           time.Time
}

type RelationType string

const (
	RelationTypeFollowing RelationType = "following"
	RelationTypeFollowed  RelationType = "followed"
	RelationTypeNone      RelationType = "none"
)

type Relationships []RelationType
