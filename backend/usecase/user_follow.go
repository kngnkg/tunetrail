package usecase

// type UserFollowUseCase struct {
// 	DB             repository.DBAccesser
// 	userFollowRepo UserFollowRepository
// 	userRepo       UserRepository
// }

// type UserFollowResponse struct {
// 	User          *entity.User
// 	Relationships entity.Relationships
// }

// func (uc *UserFollowUseCase) LookupRelationships(ctx context.Context, sourceId entity.UserId, targetIds []entity.UserId) ([]*UserFollowResponse, error) {
// 	users, err := uc.userRepo.GetUserByIds(ctx, uc.DB, targetIds)
// 	if err != nil {
// 		return nil, err
// 	}

// 	resps := make([]*UserFollowResponse, len(users))

// 	for _, user := range users {
// 		var rs entity.Relationships

// 		// フォローしているか確認する
// 		follwing, err := uc.userFollowRepo.IsFollowing(ctx, uc.DB, sourceId, user.UserId)
// 		if err != nil {
// 			return nil, err
// 		}

// 		if follwing {
// 			rs = append(rs, entity.RelationTypeFollowing)
// 		}

// 		// フォローされているか確認する
// 		followed, err := uc.userFollowRepo.IsFollowed(ctx, uc.DB, sourceId, user.UserId)
// 		if err != nil {
// 			return nil, err
// 		}

// 		if followed {
// 			rs = append(rs, entity.RelationTypeFollowed)
// 		}

// 		// どちらでもない場合
// 		if len(rs) == 0 {
// 			rs = append(rs, entity.RelationTypeNone)
// 		}

// 		resps = append(resps, &UserFollowResponse{
// 			User:          user,
// 			Relationships: rs,
// 		})
// 	}

// 	return resps, nil
// }

// func (uc *UserFollowUseCase) Follow(ctx context.Context, userFollow *entity.UserFollow) (*UserFollowResponse, error) {
// 	_, err := uc.userFollowRepo.StoreUserFollow(ctx, uc.DB, userFollow)
// 	if err != nil {
// 		return nil, err
// 	}

// 	user, err := uc.userRepo.GetUserById(ctx, uc.DB, userFollow.FolloweeId)
// 	if err != nil {
// 		return nil, err
// 	}

// 	relationships := []entity.RelationType{entity.RelationTypeFollowing}

// 	followed, err := uc.userFollowRepo.IsFollowed(ctx, uc.DB, userFollow.FolloweeId, userFollow.FolloweeId)
// 	if err != nil {
// 		return nil, err
// 	}

// 	if followed {
// 		relationships = append(relationships, entity.RelationTypeFollowed)
// 	}

// 	resp := &UserFollowResponse{
// 		User:          user,
// 		Relationships: relationships,
// 	}
// 	return resp, nil
// }

// func (uc *UserFollowUseCase) Unfollow(ctx context.Context, userFollow *entity.UserFollow) error {
// 	err := uc.userFollowRepo.DeleteUserFollow(ctx, uc.DB, userFollow)
// 	if err != nil {
// 		return err
// 	}

// 	return nil
// }
