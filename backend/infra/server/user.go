package server

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	user "github.com/kngnkg/tunetrail/backend/gen/user"
	"github.com/kngnkg/tunetrail/backend/logger"
	"github.com/kngnkg/tunetrail/backend/usecase"
	"github.com/kngnkg/tunetrail/backend/validator"
)

type userServer struct {
	user.UnimplementedUserServiceServer
	usecase *usecase.UserUseCase
	v       *validator.Validator
	logger  *logger.Logger
}

func NewUserServer(uc *usecase.UserUseCase, v *validator.Validator, l *logger.Logger) user.UserServiceServer {
	return &userServer{
		usecase: uc,
		v:       v,
		logger:  l,
	}
}

func (s *userServer) Create(ctx context.Context, in *user.CreateRequest) (*user.UserReply, error) {
	ctx = logger.WithContent(ctx, s.logger)

	u := &entity.User{
		UserId:    entity.UserId(in.UserId),
		DisplayId: in.DisplayId,
		Name:      in.Name,
		AvatarUrl: in.AvatarUrl,
		Bio:       in.Bio,
	}

	if err := s.v.Validate(u); err != nil {
		logger.FromContent(ctx).Error("invalid user.", err)
		return nil, err
	}

	res, err := s.usecase.Store(ctx, u)
	if err != nil {
		logger.FromContent(ctx).Error("failed to create user.", err)
		return nil, err
	}

	reply := &user.UserReply{
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

func (s *userServer) GetById(ctx context.Context, in *user.GetByIdRequest) (*user.UserReply, error) {
	ctx = logger.WithContent(ctx, s.logger)

	var b struct {
		UserId string `validate:"required,uuid4"`
	}
	b.UserId = in.UserId

	if err := s.v.Validate(b); err != nil {
		logger.FromContent(ctx).Error("invalid user id.", err)
		return nil, err
	}

	res, err := s.usecase.GetById(ctx, entity.UserId(in.UserId))
	if err != nil {
		logger.FromContent(ctx).Error("failed to get user.", err)
		return nil, err
	}

	reply := &user.UserReply{
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