package server

import (
	"context"

	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/auth"
	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/gen/like"
	"github.com/kngnkg/foderee/backend/gen/review"
	"github.com/kngnkg/foderee/backend/helper"
	"github.com/kngnkg/foderee/backend/usecase"
	"github.com/kngnkg/foderee/backend/validator"
)

type likeUseCase interface {
	GetLike(ctx context.Context, immutableId entity.ImmutableId, reviewId string) (*usecase.LikeResponse, error)
	Like(ctx context.Context, immutableId entity.ImmutableId, reviewId string) (*usecase.LikeResponse, error)
	Unlike(ctx context.Context, immutableId entity.ImmutableId, reviewId string) (*usecase.LikeResponse, error)
	ListLikedReviews(ctx context.Context, username entity.Username, cursor string, limit int) (*usecase.ReviewListResponse, error)
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
	"/like.LikeService/GetLike":          true,
	"/like.LikeService/Like":             true,
	"/like.LikeService/Unlike":           true,
	"/like.LikeService/ListLikedReviews": false,
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

func (s *likeServer) Unlike(ctx context.Context, in *like.LikeRequest) (*like.LikeResponse, error) {
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

	resp, err := s.uc.Unlike(ctx, immutableId, req.ReviewId)
	if err != nil {
		return nil, err
	}

	return &like.LikeResponse{
		ReviewId: resp.Review.ReviewId,
		IsLiked:  resp.IsLiked,
	}, nil
}

func (s *likeServer) ListLikedReviews(ctx context.Context, in *like.ListLikedReviewsRequest) (*review.ReviewList, error) {
	var decoded string
	var limit int
	if in.Pagenation != nil {
		var err error
		decoded, err = helper.DecodeCursor(in.Pagenation.Cursor)
		if err != nil {
			return nil, invalidArgument(ctx, err)
		}

		if in.Pagenation.Limit == 0 {
			limit = DefaultLimit
		} else {
			limit = int(in.Pagenation.Limit)
		}
	} else {
		decoded = ""
		limit = DefaultLimit
	}

	req := struct {
		Username string `validate:"omitempty,username"`
		Cursor   string `validate:"omitempty,uuid"`
		Limit    int    `validate:"omitempty,max=50"`
	}{
		Username: in.Username,
		Cursor:   decoded,
		Limit:    limit,
	}

	if err := s.v.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	res, err := s.uc.ListLikedReviews(ctx, entity.Username(req.Username), req.Cursor, limit)
	if err != nil {
		return nil, internal(ctx, err)
	}

	nextCursor := ""
	if res.NextCursor != "" {
		nextCursor = helper.EncodeCursor(res.NextCursor)
	}

	return toReviewList(res.Reviews, nextCursor), nil
}
