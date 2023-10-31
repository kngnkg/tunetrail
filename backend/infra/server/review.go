package server

import (
	"context"
	"encoding/json"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/gen/review"
	"github.com/kngnkg/tunetrail/backend/helper"
	"github.com/kngnkg/tunetrail/backend/logger"
	"github.com/kngnkg/tunetrail/backend/usecase"
	"github.com/kngnkg/tunetrail/backend/validator"
	"google.golang.org/protobuf/types/known/emptypb"
)

type reviewServer struct {
	review.UnimplementedReviewServiceServer
	uc        *usecase.ReviewUseCase
	validator *validator.Validator
	logger    *logger.Logger
}

func NewReviewServer(uc *usecase.ReviewUseCase, v *validator.Validator, l *logger.Logger) review.ReviewServiceServer {
	return &reviewServer{
		uc:        uc,
		validator: v,
		logger:    l,
	}
}

const DefaultLimit = 20

func (s *reviewServer) ListReviews(ctx context.Context, in *review.ListReviewsRequest) (*review.ReviewList, error) {
	ctx = logger.WithContent(ctx, s.logger)

	decoded, err := helper.DecodeCursor(in.Cursor)
	if err != nil {
		return nil, invalidArgument(ctx, err)
	}

	req := struct {
		ReviewId string `validate:"omitempty,uuid4"`
		Limit    int    `validate:"omitempty,max=50"`
	}{
		ReviewId: decoded,
		Limit:    int(in.Limit),
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

	res, err := s.uc.ListReviews(ctx, req.ReviewId, limit)
	if err != nil {
		return nil, internal(ctx, err)
	}

	nextCursor := ""
	if res.NextCursor != "" {
		nextCursor = helper.EncodeCursor(res.NextCursor)
	}

	return toReviewList(res.Reviews, nextCursor), nil
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
	ctx = logger.WithContent(ctx, s.logger)

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

func (s *reviewServer) CreateReview(ctx context.Context, in *review.CreateReviewRequest) (*review.Review, error) {
	ctx = logger.WithContent(ctx, s.logger)

	// TODO: ここでのバリデーションはどうするか
	req := struct {
		AuthorId        entity.ImmutableId     `validate:"required"`
		AlbumId         string                 `validate:"required"`
		Title           string                 `validate:"required"`
		Content         string                 `validate:"required,json"`
		PublishedStatus entity.PublishedStatus `validate:"required"`
	}{
		AuthorId:        entity.ImmutableId(in.UserId),
		AlbumId:         in.AlbumId,
		Title:           in.Title,
		Content:         in.Content,
		PublishedStatus: entity.PublishedStatus(in.PublishedStatus),
	}

	if err := s.validator.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	res, err := s.uc.Store(ctx, req.AuthorId, req.AlbumId, req.Title, json.RawMessage(req.Content), req.PublishedStatus)
	if err != nil {
		return nil, internal(ctx, err)
	}

	return toReview(res), nil
}

func (s *reviewServer) UpdateReview(ctx context.Context, in *review.UpdateReviewRequest) (*review.Review, error) {
	ctx = logger.WithContent(ctx, s.logger)

	req := struct {
		ReviewId        string                 `validate:"required,uuid4"`
		Title           string                 `validate:"required"`
		Content         string                 `validate:"required,json"`
		PublishedStatus entity.PublishedStatus `validate:"required"`
	}{
		ReviewId:        in.ReviewId,
		Title:           in.Title,
		Content:         in.Content,
		PublishedStatus: entity.PublishedStatus(in.PublishedStatus),
	}

	if err := s.validator.Validate(req); err != nil {
		return nil, invalidArgument(ctx, err)
	}

	res, err := s.uc.Update(ctx, req.ReviewId, req.Title, json.RawMessage(req.Content), req.PublishedStatus)
	if err != nil {
		return nil, internal(ctx, err)
	}

	return toReview(res), nil
}

func (s *reviewServer) DeleteReview(ctx context.Context, in *review.DeleteReviewRequest) (*emptypb.Empty, error) {
	ctx = logger.WithContent(ctx, s.logger)

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
