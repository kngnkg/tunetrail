package fixture

import (
	"time"

	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/testutil"
)

func Follow(f *entity.Follow) *entity.Follow {
	result := &entity.Follow{
		ImmutableId:         entity.ImmutableId(testutil.GenRandomUUID()),
		FolloweeImmutableId: entity.ImmutableId(testutil.GenRandomUUID()),
		CreatedAt:           time.Now(),
		UpdatedAt:           time.Now(),
	}
	if f == nil {
		return result
	}
	if f.ImmutableId != "" {
		result.ImmutableId = f.ImmutableId
	}
	if f.FolloweeImmutableId != "" {
		result.FolloweeImmutableId = f.FolloweeImmutableId
	}
	if !f.CreatedAt.IsZero() {
		result.CreatedAt = f.CreatedAt
	}
	if !f.UpdatedAt.IsZero() {
		result.UpdatedAt = f.UpdatedAt
	}
	return result
}
