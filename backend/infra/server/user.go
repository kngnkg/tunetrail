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

func (s *userServer) ListUsers(ctx context.Context, in *user.ListUsersRequest) (*user.UserListReply, error) {
	ctx = logger.WithContent(ctx, s.logger)

	var b struct {
		UserIds    []string `validate:"omitempty,dive,uuid4"`
		DisplayIds []string `validate:"omitempty,dive,display_id"`
	}
	b.UserIds = in.UserIds
	b.DisplayIds = in.DisplayIds

	if err := s.validator.Validate(b); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	userIds := make([]entity.UserId, len(b.UserIds))
	for i, id := range b.UserIds {
		userIds[i] = entity.UserId(id)
	}

	res, err := s.usecase.ListUsers(ctx, userIds, b.DisplayIds)
	if err != nil {
		return nil, internal(ctx, err)
	}

	return toUserListReply(res), nil
}

func (s *userServer) GetUserById(ctx context.Context, in *user.GetUserByIdRequest) (*user.UserReply, error) {
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

func (s *userServer) CreateUser(ctx context.Context, in *user.CreateUserRequest) (*user.UserReply, error) {
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

func toUserListReply(res *usecase.UserListResponse) *user.UserListReply {
	var users []*user.UserReply
	for _, user := range res.Users {
		users = append(users, toUserReply(user))
	}

	return &user.UserListReply{
		Users: users,
	}
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
