package entity

import "time"

type UserId string

type User struct {
	UserId         UserId `db:"user_id"`
	DisplayId      string `db:"display_id"`
	Name           string `db:"name"`
	AvatarUrl      string `db:"avatar_url"`
	Bio            string `db:"bio"`
	FollowersCount int
	FollowingCount int
	// FollowingGenres []string
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}
