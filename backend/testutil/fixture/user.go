package fixture

import (
	"math/rand"
	"time"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/testutil"
)

func User(u *entity.User) *entity.User {
	result := &entity.User{
		Username:       entity.Username("user_name" + testutil.GenRamdomString(10)),
		ImmutableId:    entity.ImmutableId(testutil.GenRandomUUID()),
		DisplayName:    "display name" + testutil.GenRamdomString(10),
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
	if u.Username != "" {
		result.Username = u.Username
	}
	if u.ImmutableId != "" {
		result.ImmutableId = u.ImmutableId
	}
	if u.DisplayName != "" {
		result.DisplayName = u.DisplayName
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

func Author(a *entity.Author) *entity.Author {
	result := &entity.Author{
		Username:    entity.Username("user_name" + testutil.GenRamdomString(10)),
		ImmutableId: entity.ImmutableId(testutil.GenRandomUUID()),
		DisplayName: "display name",
		AvatarUrl:   "https://example.com/avatar.png",
	}
	if a == nil {
		return result
	}
	if a.Username != "" {
		result.Username = a.Username
	}
	if a.ImmutableId != "" {
		result.ImmutableId = a.ImmutableId
	}
	if a.DisplayName != "" {
		result.DisplayName = a.DisplayName
	}
	if a.AvatarUrl != "" {
		result.AvatarUrl = a.AvatarUrl
	}
	return result
}
