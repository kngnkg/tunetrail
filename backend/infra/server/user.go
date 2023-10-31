package server

import (
	"context"
	"errors"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/gen/user"
	"github.com/kngnkg/tunetrail/backend/helper"
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

func (s *userServer) ListUsers(ctx context.Context, in *user.ListUsersRequest) (*user.UserList, error) {
	ctx = logger.WithContent(ctx, s.logger)

	decoded, err := helper.DecodeCursor(in.Cursor)
	if err != nil {
		return nil, invalidArgument(ctx, err)
	}

	var b struct {
		ImmutableId string `validate:"omitempty,uuid"`
		Limit       int    `validate:"omitempty,max=50"`
	}
	b.ImmutableId = decoded
	b.Limit = int(in.Limit)

	if err := s.validator.Validate(b); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	var limit int
	if b.Limit == 0 {
		limit = DefaultLimit
	} else {
		limit = b.Limit
	}

	res, err := s.usecase.ListUsers(ctx, entity.ImmutableId(b.ImmutableId), limit)
	if err != nil {
		return nil, internal(ctx, err)
	}

	nextCursor := ""
	if res.NextCursor != "" {
		nextCursor = helper.EncodeCursor(string(res.NextCursor))
	}

	return toUserList(res.Users, nextCursor), nil
}

func (s *userServer) GetUserByUsername(ctx context.Context, in *user.GetUserByUsernameRequest) (*user.User, error) {
	ctx = logger.WithContent(ctx, s.logger)

	var b struct {
		Username string `validate:"required,username"`
	}
	b.Username = in.Username

	if err := s.validator.Validate(b); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	res, err := s.usecase.GetByUsername(ctx, entity.Username(in.Username))
	if err != nil {
		return nil, internal(ctx, err)
	}
	if res == nil {
		return nil, notFound(ctx, err)
	}

	return toUser(res), nil
}

func (s *userServer) CreateUser(ctx context.Context, in *user.CreateUserRequest) (*user.User, error) {
	ctx = logger.WithContent(ctx, s.logger)

	u := &entity.User{
		Username:    entity.Username(in.Username),
		ImmutableId: entity.ImmutableId(in.ImmutableId),
		DisplayName: in.DisplayName,
		AvatarUrl:   in.AvatarUrl,
		Bio:         in.Bio,
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

	return toUser(res), nil
}

func toUserList(users []*entity.User, nextCursor string) *user.UserList {
	var us []*user.User
	for _, u := range users {
		us = append(us, toUser(u))
	}

	return &user.UserList{
		Users:      us,
		NextCursor: nextCursor,
		Total:      int32(len(us)),
	}
}

func toUser(u *entity.User) *user.User {
	return &user.User{
		Username:       string(u.Username),
		ImmutableId:    string(u.ImmutableId),
		DisplayName:    u.DisplayName,
		AvatarUrl:      u.AvatarUrl,
		Bio:            u.Bio,
		FollowersCount: int32(u.FollowersCount),
		FollowingCount: int32(u.FollowingCount),
		CreatedAt:      u.CreatedAt.String(),
		UpdatedAt:      u.UpdatedAt.String(),
	}
}
