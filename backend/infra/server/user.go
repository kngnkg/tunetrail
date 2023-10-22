package server

import (
	"context"

	user "github.com/kngnkg/tunetrail/backend/gen/user"
	"github.com/kngnkg/tunetrail/backend/testutil/fixture"
)

type userServer struct {
	user.UnimplementedUserServiceServer
}

func NewUserServer() user.UserServiceServer {
	return &userServer{}
}

func (s *userServer) GetById(ctx context.Context, in *user.GetByIdRequest) (*user.GetByIdReply, error) {
	res := fixture.User(nil)

	reply := &user.GetByIdReply{
		User: &user.User{
			UserId:         string(res.UserId),
			DisplayId:      res.DisplayId,
			Name:           res.Name,
			AvatarUrl:      res.AvatarUrl,
			Bio:            res.Bio,
			FollowersCount: int32(res.FollowersCount),
			FollowingCount: int32(res.FollowingCount),
			CreatedAt:      res.CreatedAt.String(),
			UpdatedAt:      res.UpdatedAt.String(),
		},
	}
	return reply, nil
}
