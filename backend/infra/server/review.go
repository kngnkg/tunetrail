package server

import (
	"context"
	"encoding/json"
	"errors"

	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/auth"
	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/gen/review"
	"github.com/kngnkg/foderee/backend/helper"
	"github.com/kngnkg/foderee/backend/usecase"
	"github.com/kngnkg/foderee/backend/validator"
	"google.golang.org/protobuf/types/known/emptypb"
)

type reviewUseCase interface {
	ListReviews(ctx context.Context, reviewId string, limit int) (*usecase.ReviewListResponse, error)
	ListMyReviews(ctx context.Context, authorId entity.ImmutableId, reviewId string, limit int) (*usecase.ReviewListResponse, error)
	ListReviewsByUsername(ctx context.Context, username entity.Username, reviewId string, limit int) (*usecase.ReviewListResponse, error)
	GetReviewById(ctx context.Context, reviewId string) (*entity.Review, error)
	GetMyReviewById(ctx context.Context, reviewId string) (*entity.Review, error)
	StoreReview(ctx context.Context, authorId entity.ImmutableId, albumId, title string, content json.RawMessage, publishedStatus entity.PublishedStatus) (*entity.Review, error)
	UpdateReview(ctx context.Context, authorId entity.ImmutableId, reviewId, albumId, title string, content json.RawMessage, publishedStatus entity.PublishedStatus) (*entity.Review, error)
	DeleteReview(ctx context.Context, reviewId string) error
}

type reviewServer struct {
	review.UnimplementedReviewServiceServer
	auth      *Auth
	validator *validator.Validator
	uc        reviewUseCase
}

func NewReviewServer(a *Auth, v *validator.Validator, uc reviewUseCase) review.ReviewServiceServer {
	return &reviewServer{
		auth:      a,
		validator: v,
		uc:        uc,
	}
}

const DefaultLimit = 20

// 認証を必要とするメソッドを定義
var authRequiredMethodsReview = map[string]bool{
	"/review.ReviewService/ListReviews":           false,
	"/review.ReviewService/ListMyReviews":         true,
	"/review.ReviewService/ListReviewsByUsername": false,
	"/review.ReviewService/GetReviewById":         false,
	"/review.ReviewService/CreateReview":          true,
	"/review.ReviewService/UpdateReview":          true,
	"/review.ReviewService/DeleteReview":          true,
}

var _ grpc_auth.ServiceAuthFuncOverride = (*reviewServer)(nil)

func (s *reviewServer) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
	// 認証を必要とするメソッドであるかどうかを判定
	if authRequiredMethodsReview[fullMethodName] {
		return s.auth.AuthFunc(ctx)
	}

	return ctx, nil
}

func (s *reviewServer) ListReviews(ctx context.Context, in *review.ListReviewsRequest) (*review.ReviewList, error) {
	reviewId, limit, err := s.handleListRequestPagenation(ctx, in.Cursor, int(in.Limit))
	if err != nil {
		return nil, err
	}

	res, err := s.uc.ListReviews(ctx, reviewId, limit)
	if err != nil {
		return nil, internal(ctx, err)
	}

	nextCursor := ""
	if res.NextCursor != "" {
		nextCursor = helper.EncodeCursor(res.NextCursor)
	}

	return toReviewList(res.Reviews, nextCursor), nil
}

func (s *reviewServer) ListMyReviews(ctx context.Context, in *review.ListReviewsRequest) (*review.ReviewList, error) {
	reviewId, limit, err := s.handleListRequestPagenation(ctx, in.Cursor, int(in.Limit))
	if err != nil {
		return nil, err
	}

	authorId := GetImmutableId(ctx)

	res, err := s.uc.ListMyReviews(ctx, authorId, reviewId, limit)
	if err != nil {
		return nil, internal(ctx, err)
	}

	nextCursor := ""
	if res.NextCursor != "" {
		nextCursor = helper.EncodeCursor(res.NextCursor)
	}

	return toReviewList(res.Reviews, nextCursor), nil
}

func (s *reviewServer) ListReviewsByUsername(ctx context.Context, in *review.ListReviewsByUsernameRequest) (*review.ReviewList, error) {
	reviewId, limit, err := s.handleListRequestPagenation(ctx, in.Cursor, int(in.Limit))
	if err != nil {
		return nil, err
	}

	req := struct {
		Username string `validate:"required,username"`
	}{
		Username: in.Username,
	}

	if err := s.validator.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	res, err := s.uc.ListReviewsByUsername(ctx, entity.Username(req.Username), reviewId, limit)
	if err != nil {
		return nil, internal(ctx, err)
	}

	nextCursor := ""
	if res.NextCursor != "" {
		nextCursor = helper.EncodeCursor(res.NextCursor)
	}

	return toReviewList(res.Reviews, nextCursor), nil
}

func (s *reviewServer) handleListRequestPagenation(ctx context.Context, inputCursor string, inputLimit int) (string, int, error) {
	decoded, err := helper.DecodeCursor(inputCursor)
	if err != nil {
		return "", 0, invalidArgument(ctx, err)
	}

	req := struct {
		ReviewId string `validate:"omitempty,uuid4"`
		Limit    int    `validate:"omitempty,max=50"`
	}{
		ReviewId: decoded,
		Limit:    int(inputLimit),
	}

	if err := s.validator.Validate(req); err != nil {
		return "", 0, invalidArgument(ctx, err)
	}

	limit := DefaultLimit
	if req.Limit > 0 {
		limit = req.Limit
	}

	return req.ReviewId, limit, nil
}

func toReviewList(reviews []*entity.Review, nextCursor string) *review.ReviewList {
	var rs []*review.Review
	for _, r := range reviews {
		rs = append(rs, toReview(r))
	}

	return &review.ReviewList{
		Reviews:    rs,
		NextCursor: nextCursor,
		Total:      int32(len(rs)),
	}
}

func (s *reviewServer) GetReviewById(ctx context.Context, in *review.GetReviewByIdRequest) (*review.Review, error) {
	req := struct {
		ReviewId string `validate:"required,uuid4"`
	}{
		ReviewId: in.ReviewId,
	}

	if err := s.validator.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	res, err := s.uc.GetReviewById(ctx, req.ReviewId)
	if err != nil {
		return nil, internal(ctx, err)
	}
	if res == nil {
		return nil, notFound(ctx, err)
	}

	return toReview(res), nil
}

func (s *reviewServer) GetMyReviewById(ctx context.Context, in *review.GetReviewByIdRequest) (*review.Review, error) {
	req := struct {
		ReviewId string `validate:"required,uuid4"`
	}{
		ReviewId: in.ReviewId,
	}

	if err := s.validator.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	res, err := s.uc.GetMyReviewById(ctx, req.ReviewId)
	if err != nil {
		return nil, internal(ctx, err)
	}
	if res == nil {
		return nil, notFound(ctx, err)
	}

	return toReview(res), nil
}

func (s *reviewServer) CreateReview(ctx context.Context, in *review.CreateReviewRequest) (*review.Review, error) {
	req := struct {
		AlbumId         string                 `validate:"required,album_id"`
		Title           string                 `validate:"required,min=1,max=100"`
		Content         string                 `validate:"required,json"`
		PublishedStatus entity.PublishedStatus `validate:"required,published_status"`
	}{
		AlbumId:         in.AlbumId,
		Title:           in.Title,
		Content:         in.Content,
		PublishedStatus: entity.PublishedStatus(in.PublishedStatus),
	}

	if err := s.validator.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	authorId := GetImmutableId(ctx)

	res, err := s.uc.StoreReview(ctx, authorId, req.AlbumId, req.Title, json.RawMessage(req.Content), req.PublishedStatus)
	if err != nil {
		return nil, internal(ctx, err)
	}

	return toReview(res), nil
}

func (s *reviewServer) UpdateReview(ctx context.Context, in *review.UpdateReviewRequest) (*review.Review, error) {
	req := struct {
		ReviewId        string                 `validate:"required,uuid4"`
		AlbumId         string                 `validate:"required,album_id"`
		Title           string                 `validate:"required"`
		Content         string                 `validate:"required,json"`
		PublishedStatus entity.PublishedStatus `validate:"required"`
	}{
		ReviewId:        in.ReviewId,
		AlbumId:         in.AlbumId,
		Title:           in.Title,
		Content:         in.Content,
		PublishedStatus: entity.PublishedStatus(in.PublishedStatus),
	}

	if err := s.validator.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	authorId := GetImmutableId(ctx)

	res, err := s.uc.UpdateReview(ctx, authorId, req.ReviewId, req.AlbumId, req.Title, json.RawMessage(req.Content), req.PublishedStatus)
	if err != nil {
		if errors.Is(err, usecase.ErrorImmutableIdIsNotMatch) {
			return nil, permissionDenied(ctx, err)
		}
		return nil, internal(ctx, err)
	}
	if res == nil {
		return nil, notFound(ctx, err)
	}

	return toReview(res), nil
}

func (s *reviewServer) DeleteReview(ctx context.Context, in *review.DeleteReviewRequest) (*emptypb.Empty, error) {
	req := struct {
		ReviewId string `validate:"required,uuid4"`
	}{
		ReviewId: in.ReviewId,
	}

	if err := s.validator.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	err := s.uc.DeleteReview(ctx, req.ReviewId)
	if err != nil {
		return nil, internal(ctx, err)
	}

	return &emptypb.Empty{}, nil
}

func toReview(r *entity.Review) *review.Review {
	return &review.Review{
		ReviewId:        r.ReviewId,
		User:            toAuthor(r.Author),
		AlbumId:         r.AlbumId,
		Title:           r.Title,
		Content:         string(r.Content),
		LikesCount:      int32(r.LikesCount),
		CreatedAt:       r.CreatedAt.String(),
		UpdatedAt:       r.UpdatedAt.String(),
		PublishedStatus: string(r.PublishedStatus),
	}
}

func toAuthor(r *entity.Author) *review.Author {
	return &review.Author{
		Username:    string(r.Username),
		ImmutableId: string(r.ImmutableId),
		DisplayName: r.DisplayName,
		AvatarUrl:   r.AvatarUrl,
	}
}
