package fixture

import (
	"math/rand"
	"time"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/testutil"
)

func User(u *entity.User) *entity.User {
	result := &entity.User{
		UserId:         entity.UserId(testutil.GenRandomUUID()),
		DisplayId:      "display_id" + testutil.GenRamdomString(5),
		Name:           "name",
		AvatarUrl:      "https://example.com/avatar.png",
		Bio:            "bio",
		FollowersCount: rand.Int(),
		FollowingCount: rand.Int(),
		CreatedAt:      time.Now(),
		UpdatedAt:      time.Now(),
	}
	if u == nil {
		return result
	}
	if u.UserId != "" {
		result.UserId = u.UserId
	}
	if u.DisplayId != "" {
		result.DisplayId = u.DisplayId
	}
	if u.Name != "" {
		result.Name = u.Name
	}
	if u.AvatarUrl != "" {
		result.AvatarUrl = u.AvatarUrl
	}
	if u.Bio != "" {
		result.Bio = u.Bio
	}
	if u.FollowersCount != 0 {
		result.FollowersCount = u.FollowersCount
	}
	if u.FollowingCount != 0 {
		result.FollowingCount = u.FollowingCount
	}
	if !u.CreatedAt.IsZero() {
		result.CreatedAt = u.CreatedAt
	}
	if !u.UpdatedAt.IsZero() {
		result.UpdatedAt = u.UpdatedAt
	}
	return result
}
