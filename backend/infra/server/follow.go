package server

import (
	"context"

	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/auth"
	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/gen/follow"
	"github.com/kngnkg/foderee/backend/usecase"
	"github.com/kngnkg/foderee/backend/validator"
)

type followUseCase interface {
	LookupRelationShips(ctx context.Context, immutableId entity.ImmutableId, usernames []entity.Username) ([]*usecase.RelationShipsResponse, error)
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
	"/follow.FollowService/LookupRelationShips": true,
}

func (s *followServer) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
	// 認証を必要とするメソッドであるかどうかを判定
	if authRequiredMethodsFollow[fullMethodName] {
		return s.a.AuthFunc(ctx)
	}

	return ctx, nil
}

var _ grpc_auth.ServiceAuthFuncOverride = (*followServer)(nil)

func (s *followServer) LookupRelationShips(ctx context.Context, in *follow.LookupRelationshipRequest) (*follow.RelationshipResponseList, error) {
	req := struct {
		Usernames []string `validate:"required,min=1,max=50,dive,username"`
	}{
		Usernames: in.Usernames,
	}

	if err := s.v.Validate(req); err != nil {
		return nil, err
	}

	usernames := make([]entity.Username, len(in.Usernames))
	for i, username := range in.Usernames {
		usernames[i] = entity.Username(username)
	}

	// ユーザーの取得
	immutableId := GetImmutableId(ctx)

	resps, err := s.uc.LookupRelationShips(ctx, immutableId, usernames)
	if err != nil {
		return nil, err
	}

	var responses []*follow.RelationshipResponse
	for _, resp := range resps {
		responses = append(responses, toRelationshipResponse(resp.User, resp.Relationships))
	}

	return &follow.RelationshipResponseList{
		Relationships: responses,
	}, nil
}

func toRelationshipResponse(u *entity.User, rs []entity.Relationship) *follow.RelationshipResponse {
	return &follow.RelationshipResponse{
		Username:      string(u.Username),
		ImmutableId:   string(u.ImmutableId),
		DisplayName:   u.DisplayName,
		Relationships: toRelationships(rs),
	}
}

func toRelationships(rs []entity.Relationship) []follow.Relationship {
	res := make([]follow.Relationship, len(rs))

	for i, r := range rs {
		switch r {
		case entity.RelationshipNone:
			res[i] = follow.Relationship_NONE
		case entity.RelationshipFollowing:
			res[i] = follow.Relationship_FOLLOWING
		case entity.RelationshipFollowedBy:
			res[i] = follow.Relationship_FOLLOWED_BY
		default:
			panic("invalid relationship")
		}
	}

	return res
}
