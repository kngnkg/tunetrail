package server

import (
	"context"
	"errors"

	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/auth"
	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/gen/user"
	"github.com/kngnkg/tunetrail/backend/helper"
	"github.com/kngnkg/tunetrail/backend/usecase"
	"github.com/kngnkg/tunetrail/backend/validator"
	"google.golang.org/protobuf/types/known/emptypb"
)

type userServer struct {
	user.UnimplementedUserServiceServer
	auth      *Auth
	validator *validator.Validator
	usecase   *usecase.UserUseCase
}

func NewUserServer(a *Auth, v *validator.Validator, uc *usecase.UserUseCase) user.UserServiceServer {
	return &userServer{
		auth:      a,
		validator: v,
		usecase:   uc,
	}
}

// 認証を必要とするメソッドを定義
var authRequiredMethodsUser = map[string]bool{
	"/user.UserService/ListUsers":         false,
	"/user.UserService/GetUserByUsername": false,
	"/user.UserService/GetMe":             true,
	"/user.UserService/CreateUser":        true,
	"/user.UserService/UpdateUser":        true,
}

var _ grpc_auth.ServiceAuthFuncOverride = (*userServer)(nil)

func (s *userServer) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
	// 認証を必要とするメソッドであるかどうかを判定
	if authRequiredMethodsUser[fullMethodName] {
		return s.auth.AuthFunc(ctx)
	}

	return ctx, nil
}

func (s *userServer) ListUsers(ctx context.Context, in *user.ListUsersRequest) (*user.UserList, error) {
	decoded, err := helper.DecodeCursor(in.Cursor)
	if err != nil {
		return nil, invalidArgument(ctx, err)
	}

	req := struct {
		ImmutableId string `validate:"omitempty,uuid"`
		Limit       int    `validate:"omitempty,max=50"`
	}{
		ImmutableId: decoded,
		Limit:       int(in.Limit),
	}

	if err := s.validator.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	var limit int
	if req.Limit == 0 {
		limit = DefaultLimit
	} else {
		limit = req.Limit
	}

	res, err := s.usecase.ListUsers(ctx, entity.ImmutableId(req.ImmutableId), limit)
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
	req := struct {
		Username string `validate:"required,username"`
	}{
		Username: in.Username,
	}

	if err := s.validator.Validate(req); err != nil {
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

func (s *userServer) GetMe(ctx context.Context, in *emptypb.Empty) (*user.User, error) {
	token := GetToken(ctx)
	immutableId := token.Sub

	res, err := s.usecase.GetMe(ctx, entity.ImmutableId(immutableId))
	if err != nil {
		return nil, internal(ctx, err)
	}
	if res == nil {
		return nil, notFound(ctx, err)
	}

	return toUser(res), nil
}

func (s *userServer) CreateUser(ctx context.Context, in *emptypb.Empty) (*user.User, error) {
	token := GetToken(ctx)

	res, err := s.usecase.Store(ctx, entity.ImmutableId(token.Sub), token.Email)
	if err != nil {
		if errors.Is(err, usecase.ErrorUsernameAlreadyExists) {
			return nil, alreadyExists(ctx, err)
		}
		return nil, internal(ctx, err)
	}

	return toUser(res), nil
}

func (s *userServer) UpdateUser(ctx context.Context, in *user.UpdateUserRequest) (*user.User, error) {
	token := GetToken(ctx)

	req := struct {
		Username    string `validate:"omitempty,username"`
		DisplayName string `validate:"omitempty,min=3,max=30"`
		AvatarUrl   string `validate:"omitempty,url"`
		Bio         string `validate:"omitempty,max=1000"`
	}{
		Username:    in.Username,
		DisplayName: in.DisplayName,
		AvatarUrl:   in.AvatarUrl,
		Bio:         in.Bio,
	}

	if err := s.validator.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	res, err := s.usecase.UpdateUser(ctx, entity.Username(req.Username), entity.ImmutableId(token.Sub), req.DisplayName, req.AvatarUrl, req.Bio)
	if err != nil {
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
