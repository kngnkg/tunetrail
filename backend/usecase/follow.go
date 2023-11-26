package usecase

import (
	"context"

	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/infra/repository"
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

	resps := make([]*RelationShipsResponse, len(us))

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
