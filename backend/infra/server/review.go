package server

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/gen/album"
	"github.com/kngnkg/tunetrail/backend/gen/review"
	"github.com/kngnkg/tunetrail/backend/gen/user"
	"github.com/kngnkg/tunetrail/backend/logger"
	"github.com/kngnkg/tunetrail/backend/usecase"
	"github.com/kngnkg/tunetrail/backend/validator"
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

func (s *reviewServer) GetReviewById(ctx context.Context, in *review.GetByIdRequest) (*review.ReviewReply, error) {
	ctx = logger.WithContent(ctx, s.logger)

	var b struct {
		ReviewId string `validate:"required,uuid4"`
	}
	b.ReviewId = in.ReviewId

	if err := s.validator.Validate(b); err != nil {
		logger.FromContent(ctx).Error("invalid request.", err)
		return nil, err
	}

	res, err := s.uc.GetById(ctx, b.ReviewId)
	if err != nil {
		logger.FromContent(ctx).Error("failed to get review.", err)
		return nil, err
	}

	return toReviewReply(res), nil
}

func toReviewReply(res *usecase.ReviewResponse) *review.ReviewReply {
	return &review.ReviewReply{
		ReviewId:        res.Review.ReviewId,
		User:            toUser(res.Review.Author),
		Album:           toAlbum(res.Review.Album, res.TrackPage),
		Title:           res.Review.Title,
		Content:         res.Review.Content,
		LikesCount:      int32(res.Review.LikesCount),
		CreatedAt:       res.Review.CreatedAt.String(),
		UpdatedAt:       res.Review.UpdatedAt.String(),
		PublishedStatus: string(res.Review.PublishedStatus),
	}
}

func (s *reviewServer) CreateReview(ctx context.Context, in *review.CreateRequest) (*review.ReviewReply, error) {
	ctx = logger.WithContent(ctx, s.logger)

	// TODO: ここでのバリデーションはどうするか
	var r struct {
		AuthorId        entity.UserId          `validate:"required"`
		AlbumId         string                 `validate:"required"`
		Title           string                 `validate:"required"`
		Content         string                 `validate:"required"`
		PublishedStatus entity.PublishedStatus `validate:"required"`
	}
	r.AuthorId = entity.UserId(in.UserId)
	r.AlbumId = in.AlbumId
	r.Title = in.Title
	r.Content = in.Content
	r.PublishedStatus = entity.PublishedStatus(in.PublishedStatus)

	if err := s.validator.Validate(r); err != nil {
		logger.FromContent(ctx).Error("invalid request.", err)
		return nil, err
	}

	res, err := s.uc.Store(ctx, r.AuthorId, r.AlbumId, r.Title, r.Content, r.PublishedStatus)
	if err != nil {
		logger.FromContent(ctx).Error("failed to create review.", err)
		return nil, err
	}

	return toReviewReply(res), nil
}

func toUser(u *entity.User) *user.User {
	return &user.User{
		UserId:         string(u.UserId),
		DisplayId:      u.DisplayId,
		Name:           u.Name,
		AvatarUrl:      u.AvatarUrl,
		Bio:            u.Bio,
		FollowersCount: int32(u.FollowersCount),
		FollowingCount: int32(u.FollowingCount),
		CreatedAt:      u.CreatedAt.String(),
		UpdatedAt:      u.UpdatedAt.String(),
	}
}

func toTrackPage(tp *entity.TrackPage) *album.TrackPage {
	var ts []*album.Track
	for _, t := range tp.Tracks {
		ts = append(ts, &album.Track{
			TrackId:     t.TrackId,
			SpotifyUri:  t.SpotifyUri,
			SpotifyUrl:  t.SpotifyUrl,
			Title:       t.Title,
			DurationMs:  int32(t.DurationMs),
			TrackNumber: int32(t.TrackNumber),
			PreviewUrl:  t.PreviewUrl,
		})
	}

	return &album.TrackPage{
		Tracks:   ts,
		Limit:    int32(tp.Limit),
		Offset:   int32(tp.Offset),
		Total:    int32(tp.Total),
		Next:     tp.Next,
		Previous: tp.Previous,
	}
}

func toAlbum(a *entity.Album, tp *entity.TrackPage) *album.Album {
	return &album.Album{
		AlbumId:     a.AlbumId,
		SpotifyUri:  a.SpotifyUri,
		SpotifyUrl:  a.SpotifyUrl,
		Name:        a.Name,
		Artists:     toSimpleArtists(a.Artists),
		Tracks:      toTrackPage(tp),
		CoverUrl:    a.CoverUrl,
		ReleaseDate: a.ReleaseDate.String(),
		Genres:      a.Genres,
	}
}

func toSimpleArtists(artists []*entity.SimpleArtist) []*album.SimpleArtist {
	var as []*album.SimpleArtist

	for _, a := range artists {
		as = append(as, &album.SimpleArtist{
			ArtistId:   a.ArtistId,
			SpotifyUri: a.SpotifyUri,
			SpotifyUrl: a.SpotifyUrl,
			Name:       a.Name,
		})
	}
	return as
}
