package server

import (
	"context"

	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/auth"
	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/gen/like"
	"github.com/kngnkg/foderee/backend/usecase"
	"github.com/kngnkg/foderee/backend/validator"
)

type likeUseCase interface {
	GetLike(ctx context.Context, immutableId entity.ImmutableId, reviewId string) (*usecase.LikeResponse, error)
	Like(ctx context.Context, immutableId entity.ImmutableId, reviewId string) (*usecase.LikeResponse, error)
}

type likeServer struct {
	like.UnimplementedLikeServiceServer
	a  *Auth
	v  *validator.Validator
	uc likeUseCase
}

func NewLikeServer(a *Auth, v *validator.Validator, uc likeUseCase) like.LikeServiceServer {
	return &likeServer{
		a:  a,
		v:  v,
		uc: uc,
	}
}

// 認証を必要とするメソッドを定義
var authRequiredMethodsLike = map[string]bool{
	"/like.LikeService/GetLike": true,
	"/like.LikeService/Like":    true,
}

func (s *likeServer) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
	// 認証を必要とするメソッドであるかどうかを判定
	if authRequiredMethodsLike[fullMethodName] {
		return s.a.AuthFunc(ctx)
	}

	return ctx, nil
}

var _ grpc_auth.ServiceAuthFuncOverride = (*likeServer)(nil)

func (s *likeServer) GetLike(ctx context.Context, in *like.LikeRequest) (*like.LikeResponse, error) {
	req := struct {
		ReviewId string `validate:"required"`
	}{
		ReviewId: in.ReviewId,
	}

	// バリデーション
	if err := s.v.Validate(req); err != nil {
		return nil, err
	}

	// ユーザーの取得
	immutableId := GetImmutableId(ctx)

	resp, err := s.uc.GetLike(ctx, immutableId, req.ReviewId)
	if err != nil {
		return nil, err
	}

	return &like.LikeResponse{
		ReviewId: resp.Review.ReviewId,
		IsLiked:  resp.IsLiked,
	}, nil
}

func (s *likeServer) Like(ctx context.Context, in *like.LikeRequest) (*like.LikeResponse, error) {
	req := struct {
		ReviewId string `validate:"required"`
	}{
		ReviewId: in.ReviewId,
	}

	// バリデーション
	if err := s.v.Validate(req); err != nil {
		return nil, err
	}

	// ユーザーの取得
	immutableId := GetImmutableId(ctx)

	resp, err := s.uc.Like(ctx, immutableId, req.ReviewId)
	if err != nil {
		return nil, err
	}

	return &like.LikeResponse{
		ReviewId: resp.Review.ReviewId,
		IsLiked:  resp.IsLiked,
	}, nil
}
