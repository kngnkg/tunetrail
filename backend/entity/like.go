package entity

type Like struct {
	ImmutableId ImmutableId `db:"user_id"`
	ReviewId    string      `db:"review_id"`
	CreatedAt   int64       `db:"created_at"`
	UpdatedAt   int64       `db:"updated_at"`
}
