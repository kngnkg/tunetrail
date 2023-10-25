package server

import (
	"context"
	"errors"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/gen/user"
	"github.com/kngnkg/tunetrail/backend/logger"
	"github.com/kngnkg/tunetrail/backend/usecase"
	"github.com/kngnkg/tunetrail/backend/validator"
)

type userServer struct {
	user.UnimplementedUserServiceServer
	usecase   *usecase.UserUseCase
	validator *validator.Validator
	logger    *logger.Logger
}

func NewUserServer(uc *usecase.UserUseCase, v *validator.Validator, l *logger.Logger) user.UserServiceServer {
	return &userServer{
		usecase:   uc,
		validator: v,
		logger:    l,
	}
}

func (s *userServer) GetUserById(ctx context.Context, in *user.GetByIdRequest) (*user.UserReply, error) {
	ctx = logger.WithContent(ctx, s.logger)

	var b struct {
		UserId string `validate:"required,uuid4"`
	}
	b.UserId = in.UserId

	if err := s.validator.Validate(b); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	res, err := s.usecase.GetById(ctx, entity.UserId(in.UserId))
	if err != nil {
		return nil, internal(ctx, err)
	}
	if res == nil {
		return nil, notFound(ctx, err)
	}

	return toUserReply(res), nil
}

func (s *userServer) CreateUser(ctx context.Context, in *user.CreateRequest) (*user.UserReply, error) {
	ctx = logger.WithContent(ctx, s.logger)

	u := &entity.User{
		UserId:    entity.UserId(in.UserId),
		DisplayId: in.DisplayId,
		Name:      in.Name,
		AvatarUrl: in.AvatarUrl,
		Bio:       in.Bio,
	}

	if err := s.validator.Validate(u); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	res, err := s.usecase.Store(ctx, u)
	if err != nil {
		if errors.Is(err, usecase.ErrorDisplayIdAlreadyExists) {
			return nil, alreadyExists(ctx, err)
		}
		return nil, internal(ctx, err)
	}

	return toUserReply(res), nil
}

func toUserReply(res *usecase.UserResponse) *user.UserReply {
	return &user.UserReply{
		UserId:         string(res.UserId),
		DisplayId:      res.DisplayId,
		Name:           res.Name,
		AvatarUrl:      res.AvatarUrl,
		Bio:            res.Bio,
		FollowersCount: int32(res.FollowersCount),
		FollowingCount: int32(res.FollowingCount),
		CreatedAt:      res.CreatedAt.String(),
		UpdatedAt:      res.UpdatedAt.String(),
	}
}
