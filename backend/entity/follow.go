package entity

import "time"

type Follow struct {
	ImmutableId         ImmutableId `db:"user_id"`
	FolloweeImmutableId ImmutableId `db:"follow_user_id"`
	CreatedAt           time.Time   `db:"created_at"`
	UpdatedAt           time.Time   `db:"updated_at"`
}
