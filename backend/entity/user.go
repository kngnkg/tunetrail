package entity

import "time"

type Username string

type ImmutableId string

type User struct {
	Username       Username    `db:"username" validate:"required,username"`
	ImmutableId    ImmutableId `db:"user_id" validate:"required,uuid4"`
	DisplayName    string      `db:"display_name" validate:"required,min=3,max=20"`
	AvatarUrl      string      `db:"avatar_url" validate:"url"`
	Bio            string      `db:"bio" validate:"max=1000"`
	FollowersCount int
	FollowingCount int
	CreatedAt      time.Time `db:"created_at"`
	UpdatedAt      time.Time `db:"updated_at"`
}

func (u *User) ToAuthor() *Author {
	return &Author{
		Username:    u.Username,
		ImmutableId: u.ImmutableId,
		DisplayName: u.DisplayName,
		AvatarUrl:   u.AvatarUrl,
	}
}

type Author struct {
	Username    Username    `db:"username" validate:"required,username"`
	ImmutableId ImmutableId `db:"user_id" validate:"required,uuid4"`
	DisplayName string      `db:"display_name" validate:"required,min=3,max=20"`
	AvatarUrl   string      `db:"avatar_url" validate:"url"`
}
