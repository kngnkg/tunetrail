package fixture

import (
	"time"

	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/testutil"
)

func Like(f *entity.Like) *entity.Like {
	result := &entity.Like{
		ImmutableId: entity.ImmutableId(testutil.GenRandomUUID()),
		ReviewId:    testutil.GenRandomUUID(),
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}
	if f == nil {
		return result
	}
	if f.ImmutableId != "" {
		result.ImmutableId = f.ImmutableId
	}
	if f.ReviewId != "" {
		result.ReviewId = f.ReviewId
	}
	if !f.CreatedAt.IsZero() {
		result.CreatedAt = f.CreatedAt
	}
	if !f.UpdatedAt.IsZero() {
		result.UpdatedAt = f.UpdatedAt
	}
	return result
}
