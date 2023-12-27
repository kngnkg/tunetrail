package entity

import "time"

type Like struct {
	ImmutableId ImmutableId `db:"user_id"`
	ReviewId    string      `db:"review_id"`
	CreatedAt   time.Time   `db:"created_at"`
	UpdatedAt   time.Time   `db:"updated_at"`
}
