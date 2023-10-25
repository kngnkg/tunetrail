package entity

import "time"

type UserId string

type User struct {
	UserId         UserId `db:"user_id" validate:"required,uuid4"`
	DisplayId      string `db:"display_id" validate:"required,display_id"`
	Name           string `db:"name" validate:"required,min=3,max=20"`
	AvatarUrl      string `db:"avatar_url" validate:"url"`
	Bio            string `db:"bio" validate:"max=1000"`
	FollowersCount int
	FollowingCount int
	// FollowingGenres []string
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}

type UserFilter struct {
	Page
	UserIds    []UserId
	DisplayIds []string
}

func NewUserFilter(cursor string, limit int, userIds []UserId, displayIds []string) *UserFilter {
	return &UserFilter{
		Page:       *NewPage(cursor, limit),
		UserIds:    userIds,
		DisplayIds: displayIds,
	}
}
