package usecase

import (
	"context"
	"fmt"

	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/infra/repository"
	"github.com/kngnkg/foderee/backend/logger"
)

type FollowUseCase struct {
	DB repository.DBAccesser
	ur UserRepository
	fr FollowRepository
}

func NewFollowUseCase(db repository.DBAccesser, ur UserRepository, fr FollowRepository) *FollowUseCase {
	return &FollowUseCase{
		DB: db,
		ur: ur,
		fr: fr,
	}
}

type RelationShipsResponse struct {
	User          *entity.User
	Relationships []entity.Relationship
}

func (uc *FollowUseCase) LookupRelationShips(ctx context.Context, immutableId entity.ImmutableId, usernames []entity.Username) ([]*RelationShipsResponse, error) {
	us, err := uc.ur.ListUsersByUsername(ctx, uc.DB, usernames)
	if err != nil {
		return nil, err
	}

	resps := make([]*RelationShipsResponse, 0, len(us))

	for _, u := range us {
		var rs []entity.Relationship

		// フォローしているか確認する
		follwing, err := uc.fr.IsFollowing(ctx, uc.DB, immutableId, u.ImmutableId)
		if err != nil {
			return nil, err
		}

		if follwing {
			rs = append(rs, entity.RelationshipFollowing)
		}

		// フォローされているか確認する
		followed, err := uc.fr.IsFollowing(ctx, uc.DB, u.ImmutableId, immutableId)
		if err != nil {
			return nil, err
		}

		if followed {
			rs = append(rs, entity.RelationshipFollowedBy)
		}

		// どちらでもない場合
		if len(rs) == 0 {
			rs = append(rs, entity.RelationshipNone)
		}

		resps = append(resps, &RelationShipsResponse{
			User:          u,
			Relationships: rs,
		})
	}

	return resps, nil
}

func (uc *FollowUseCase) Follow(ctx context.Context, immutableId entity.ImmutableId, targetUsername entity.Username) (*RelationShipsResponse, error) {
	// ユーザーの取得
	targetUser, err := uc.ur.GetUserByUsername(ctx, uc.DB, targetUsername)
	if err != nil {
		return nil, err
	}
	if targetUser == nil {
		return nil, fmt.Errorf("user not found: username=%s", targetUsername)
	}
	if targetUser.ImmutableId == immutableId {
		return nil, fmt.Errorf("cannot follow myself: username=%s", targetUsername)
	}

	tx, err := uc.DB.BeginTxx(ctx, nil)
	if err != nil {
		return nil, err
	}

	// フォローする
	_, err = uc.fr.StoreFollow(ctx, tx, &entity.Follow{
		ImmutableId:         immutableId,
		FolloweeImmutableId: targetUser.ImmutableId,
	})
	if err != nil {
		defer func() {
			if err := tx.Rollback(); err != nil {
				logger.FromContext(ctx).Error("failed to rollback transaction: %v", err)
			}
		}()

		return nil, err
	}

	if err = tx.Commit(); err != nil {
		return nil, err
	}

	var rs []entity.Relationship

	rs = append(rs, entity.RelationshipFollowing)

	// フォローされているか確認する
	followed, err := uc.fr.IsFollowing(ctx, uc.DB, targetUser.ImmutableId, immutableId)
	if err != nil {
		return nil, err
	}

	if followed {
		rs = append(rs, entity.RelationshipFollowedBy)
	}

	return &RelationShipsResponse{
		User:          targetUser,
		Relationships: rs,
	}, nil
}
