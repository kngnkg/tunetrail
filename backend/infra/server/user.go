package server

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	user "github.com/kngnkg/tunetrail/backend/gen/user"
	"github.com/kngnkg/tunetrail/backend/logger"
	"github.com/kngnkg/tunetrail/backend/usecase"
)

type userServer struct {
	user.UnimplementedUserServiceServer
	usecase *usecase.UserUseCase
	logger  *logger.Logger
}

func NewUserServer(uc *usecase.UserUseCase, l *logger.Logger) user.UserServiceServer {
	return &userServer{
		usecase: uc,
		logger:  l,
	}
}

func (s *userServer) GetById(ctx context.Context, in *user.GetByIdRequest) (*user.GetByIdReply, error) {
	ctx = logger.WithContent(ctx, s.logger)

	res, err := s.usecase.GetById(ctx, entity.UserId(in.UserId))
	if err != nil {
		logger.FromContent(ctx).Error("failed to get user.", err)
		return nil, err
	}

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
