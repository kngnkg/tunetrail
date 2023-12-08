package server

import (
	"context"

	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/auth"
	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/gen/follow"
	"github.com/kngnkg/foderee/backend/gen/user"
	"github.com/kngnkg/foderee/backend/helper"
	"github.com/kngnkg/foderee/backend/usecase"
	"github.com/kngnkg/foderee/backend/validator"
)

type followUseCase interface {
	ListFollows(ctx context.Context, immutableId entity.ImmutableId, usernames []entity.Username) ([]*usecase.FollowResponse, error)
	ListFollowings(ctx context.Context, immutableId, cursor entity.ImmutableId, limit int) (*usecase.UserListResponse, error)
	ListFollowers(ctx context.Context, immutableId, cursor entity.ImmutableId, limit int) (*usecase.UserListResponse, error)
	Follow(ctx context.Context, immutableId entity.ImmutableId, username entity.Username) (*usecase.FollowResponse, error)
	Unfollow(ctx context.Context, immutableId entity.ImmutableId, username entity.Username) (*usecase.FollowResponse, error)
}

type followServer struct {
	follow.UnimplementedFollowServiceServer
	a  *Auth
	v  *validator.Validator
	uc followUseCase
}

func NewFollowServer(a *Auth, v *validator.Validator, uc followUseCase) follow.FollowServiceServer {
	return &followServer{
		a:  a,
		v:  v,
		uc: uc,
	}
}

// 認証を必要とするメソッドを定義
var authRequiredMethodsFollow = map[string]bool{
	"/follow.FollowService/ListFollows":    true,
	"/follow.FollowService/ListFollowings": true,
	"/follow.FollowService/ListFollowers":  true,
	"/follow.FollowService/Follow":         true,
	"/follow.FollowService/Unfollow":       true,
}

func (s *followServer) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
	// 認証を必要とするメソッドであるかどうかを判定
	if authRequiredMethodsFollow[fullMethodName] {
		return s.a.AuthFunc(ctx)
	}

	return ctx, nil
}

var _ grpc_auth.ServiceAuthFuncOverride = (*followServer)(nil)

func (s *followServer) ListFollows(ctx context.Context, in *follow.ListFollowsRequest) (*follow.FollowResponseList, error) {
	req := struct {
		Usernames []string `validate:"required,min=1,max=50,dive,username"`
	}{
		Usernames: in.Usernames,
	}

	if err := s.v.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	usernames := make([]entity.Username, len(in.Usernames))
	for i, username := range in.Usernames {
		usernames[i] = entity.Username(username)
	}

	// ユーザーの取得
	immutableId := GetImmutableId(ctx)

	resp, err := s.uc.ListFollows(ctx, immutableId, usernames)
	if err != nil {
		return nil, internal(ctx, err)
	}

	resps := make([]*follow.FollowResponse, len(resp))
	for i, r := range resp {
		resps[i] = &follow.FollowResponse{
			Username:    string(r.User.Username),
			ImmutableId: string(r.User.ImmutableId),
			DisplayName: r.User.DisplayName,
			IsFollowing: r.IsFollowing,
		}
	}

	return &follow.FollowResponseList{
		FollowResponses: resps,
	}, nil
}

func (s *followServer) ListFollowings(ctx context.Context, in *user.ListUsersRequest) (*user.UserList, error) {
	decoded, err := helper.DecodeCursor(in.Cursor)
	if err != nil {
		return nil, invalidArgument(ctx, err)
	}

	req := struct {
		Cursor string `validate:"omitempty,uuid"`
		Limit  int    `validate:"omitempty,max=50"`
	}{
		Cursor: decoded,
		Limit:  int(in.Limit),
	}

	if err := s.v.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	var limit int
	if req.Limit == 0 {
		limit = DefaultLimit
	} else {
		limit = req.Limit
	}

	immutableId := GetImmutableId(ctx)

	resp, err := s.uc.ListFollowings(ctx, immutableId, entity.ImmutableId(req.Cursor), limit)
	if err != nil {
		return nil, internal(ctx, err)
	}

	nextCursor := ""
	if resp.NextCursor != "" {
		nextCursor = helper.EncodeCursor(string(resp.NextCursor))
	}

	return toUserList(resp.Users, nextCursor), nil
}

func (s *followServer) ListFollowers(ctx context.Context, in *user.ListUsersRequest) (*user.UserList, error) {
	decoded, err := helper.DecodeCursor(in.Cursor)
	if err != nil {
		return nil, invalidArgument(ctx, err)
	}

	req := struct {
		Cursor string `validate:"omitempty,uuid"`
		Limit  int    `validate:"omitempty,max=50"`
	}{
		Cursor: decoded,
		Limit:  int(in.Limit),
	}

	if err := s.v.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	var limit int
	if req.Limit == 0 {
		limit = DefaultLimit
	} else {
		limit = req.Limit
	}

	immutableId := GetImmutableId(ctx)

	resp, err := s.uc.ListFollowers(ctx, immutableId, entity.ImmutableId(req.Cursor), limit)
	if err != nil {
		return nil, internal(ctx, err)
	}

	nextCursor := ""
	if resp.NextCursor != "" {
		nextCursor = helper.EncodeCursor(string(resp.NextCursor))
	}

	return toUserList(resp.Users, nextCursor), nil
}

func (s *followServer) Follow(ctx context.Context, in *follow.FollowRequest) (*follow.FollowResponse, error) {
	req := struct {
		Username string `validate:"required,username"`
	}{
		Username: in.Username,
	}

	if err := s.v.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	immutableId := GetImmutableId(ctx)

	resp, err := s.uc.Follow(ctx, immutableId, entity.Username(in.Username))
	if err != nil {
		return nil, internal(ctx, err)
	}

	return &follow.FollowResponse{
		Username:    string(resp.User.Username),
		ImmutableId: string(resp.User.ImmutableId),
		DisplayName: resp.User.DisplayName,
		IsFollowing: resp.IsFollowing,
	}, nil
}

func (s *followServer) Unfollow(ctx context.Context, in *follow.FollowRequest) (*follow.FollowResponse, error) {
	req := struct {
		Username string `validate:"required,username"`
	}{
		Username: in.Username,
	}

	if err := s.v.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	immutableId := GetImmutableId(ctx)

	resp, err := s.uc.Unfollow(ctx, immutableId, entity.Username(in.Username))
	if err != nil {
		return nil, internal(ctx, err)
	}

	return &follow.FollowResponse{
		Username:    string(resp.User.Username),
		ImmutableId: string(resp.User.ImmutableId),
		DisplayName: resp.User.DisplayName,
		IsFollowing: resp.IsFollowing,
	}, nil
}
