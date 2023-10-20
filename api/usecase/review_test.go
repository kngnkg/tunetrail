package usecase

import (
	"context"
	"log/slog"
	"reflect"
	"testing"

	"github.com/kngnkg/tunetrail/api/entity"
	"github.com/kngnkg/tunetrail/api/logger"
	"github.com/kngnkg/tunetrail/api/testutil"
	"github.com/kngnkg/tunetrail/api/testutil/fixture"
	"github.com/stretchr/testify/assert"
)

func prepareReviews(t *testing.T) []*entity.Review {
	t.Helper()

	var wants []*entity.Review
	for i := 0; i < 10; i++ {
		wants = append(wants, fixture.Review(nil))
	}

	return wants
}

func TestReviewUseCase_Store(t *testing.T) {
	t.Parallel()

	in := fixture.Review(nil)
	in.ReviewId = "" // 入力時はReviewIdが設定されていない

	type args struct {
		ctx    context.Context
		review *entity.Review
	}
	tests := []struct {
		name    string
		args    args
		want    *ReviewResponse
		wantErr bool
	}{
		{
			name: "正常系",
			args: args{
				ctx:    context.Background(),
				review: in,
			},
			want:    &ReviewResponse{Review: fixture.Review(in)},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			moqReviewRepo := &ReviewRepositoryMock{}
			moqUserRepo := &UserRepositoryMock{}
			moqAlbumRepo := &AlbumRepositoryMock{}
			moqReviewRepo.StoreFunc = func(pctx context.Context, review *entity.Review) (*entity.Review, error) {
				assert.Equal(t, tt.args.ctx, pctx)
				assert.Equal(t, tt.args.review, review)
				return tt.want.Review, nil
			}
			moqUserRepo.GetByIdFunc = func(pctx context.Context, userId entity.UserId) (*entity.User, error) {
				assert.Equal(t, tt.args.ctx, pctx)
				assert.Equal(t, tt.want.Review.Author.UserId, userId)
				return tt.want.Review.Author, nil
			}
			moqAlbumRepo.GetByIdFunc = func(pctx context.Context, albumId string) (*entity.Album, error) {
				assert.Equal(t, tt.args.ctx, pctx)
				assert.Equal(t, tt.want.Review.Album.AlbumId, albumId)
				return tt.want.Review.Album, nil
			}

			uc := &ReviewUseCase{
				reviewRepo: moqReviewRepo,
				albumRepo:  moqAlbumRepo,
				userRepo:   moqUserRepo,
			}
			got, err := uc.Store(tt.args.ctx, tt.args.review)
			if (err != nil) != tt.wantErr {
				t.Errorf("ReviewUseCase.Store() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("ReviewUseCase.Store() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestReviewUseCase_GetById(t *testing.T) {
	t.Parallel()

	wantReviewId := "reviewId"

	type args struct {
		ctx      context.Context
		reviewId string
	}
	tests := []struct {
		name    string
		args    args
		want    *ReviewResponse
		wantErr bool
	}{
		{
			name: "正常系",
			args: args{
				ctx:      context.Background(),
				reviewId: wantReviewId,
			},
			want: &ReviewResponse{
				Review: fixture.Review(&entity.Review{ReviewId: wantReviewId}),
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			moqReviewRepo := &ReviewRepositoryMock{}
			moqUserRepo := &UserRepositoryMock{}
			moqAlbumRepo := &AlbumRepositoryMock{}
			moqReviewRepo.GetByIdFunc = func(pctx context.Context, reviewId string) (*entity.Review, error) {
				assert.Equal(t, tt.args.ctx, pctx)
				assert.Equal(t, tt.args.reviewId, reviewId)
				return tt.want.Review, nil
			}
			moqUserRepo.GetByIdFunc = func(pctx context.Context, userId entity.UserId) (*entity.User, error) {
				assert.Equal(t, tt.args.ctx, pctx)
				assert.Equal(t, tt.want.Review.Author.UserId, userId)
				return tt.want.Review.Author, nil
			}
			moqAlbumRepo.GetByIdFunc = func(pctx context.Context, albumId string) (*entity.Album, error) {
				assert.Equal(t, tt.args.ctx, pctx)
				assert.Equal(t, tt.want.Review.Album.AlbumId, albumId)
				return tt.want.Review.Album, nil
			}

			uc := &ReviewUseCase{
				reviewRepo: moqReviewRepo,
				albumRepo:  moqAlbumRepo,
				userRepo:   moqUserRepo,
			}
			got, err := uc.GetById(tt.args.ctx, tt.args.reviewId)
			if (err != nil) != tt.wantErr {
				t.Errorf("ReviewUseCase.GetById() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("ReviewUseCase.GetById() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestReviewUseCase_GetByAuthorId(t *testing.T) {
	t.Parallel()

	type args struct {
		ctx        context.Context
		authorId   entity.UserId
		nextCursor string
		limit      int
	}
	tests := []struct {
		name       string
		args       args
		want       *ReviewListResponse
		wantCursor string
		wantErr    bool
	}{
		{
			name: "正常系",
			args: args{
				ctx:        context.Background(),
				authorId:   "authorId",
				nextCursor: "",
				limit:      10,
			},
			want: &ReviewListResponse{
				Reviews: prepareReviews(t), NextCursor: "",
			},
			wantCursor: testutil.GenRandomUUID(),
			wantErr:    false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			moqReviewRepo := &ReviewRepositoryMock{}
			moqAlbumRepo := &AlbumRepositoryMock{}
			moqUserRepo := &UserRepositoryMock{}
			moqReviewRepo.GetByAuthorIdFunc = func(pctx context.Context, authorId entity.UserId, nextCursor string, limit int) ([]*entity.Review, string, error) {
				return tt.want.Reviews, tt.wantCursor, nil
			}
			moqAlbumRepo.GetByIdsFunc = func(pctx context.Context, albumIds []string) ([]*entity.Album, error) {
				var as []*entity.Album
				for _, r := range tt.want.Reviews {
					as = append(as, r.Album)
				}
				return as, nil
			}
			moqUserRepo.GetByIdFunc = func(pctx context.Context, userId entity.UserId) (*entity.User, error) {
				for _, r := range tt.want.Reviews {
					if r.Author.UserId == userId {
						return r.Author, nil
					}
				}
				return nil, nil
			}

			uc := &ReviewUseCase{
				reviewRepo: moqReviewRepo,
				albumRepo:  moqAlbumRepo,
				userRepo:   moqUserRepo,
			}

			l := logger.New(&logger.LoggerOptions{
				Level: slog.LevelDebug,
			})
			ctx := logger.WithContent(tt.args.ctx, l)

			got, err := uc.GetByAuthorId(ctx, tt.args.authorId, tt.args.nextCursor, tt.args.limit)
			if (err != nil) != tt.wantErr {
				t.Errorf("ReviewUseCase.GetByAuthorId() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			assert.Equal(t, tt.want.Reviews, got.Reviews)
		})
	}
}

func TestReviewUseCase_Update(t *testing.T) {
	t.Parallel()

	in := fixture.Review(nil)

	type args struct {
		ctx    context.Context
		review *entity.Review
	}
	tests := []struct {
		name    string
		args    args
		want    *ReviewResponse
		wantErr bool
	}{
		{
			name: "正常系",
			args: args{
				ctx:    context.Background(),
				review: in,
			},
			want:    &ReviewResponse{Review: in},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			moqReviewRepo := &ReviewRepositoryMock{}
			moqUserRepo := &UserRepositoryMock{}
			moqAlbumRepo := &AlbumRepositoryMock{}
			moqReviewRepo.UpdateFunc = func(pctx context.Context, review *entity.Review) (*entity.Review, error) {
				return tt.want.Review, nil
			}
			moqUserRepo.GetByIdFunc = func(pctx context.Context, userId entity.UserId) (*entity.User, error) {
				return tt.want.Review.Author, nil
			}
			moqAlbumRepo.GetByIdFunc = func(pctx context.Context, albumId string) (*entity.Album, error) {
				return tt.want.Review.Album, nil
			}

			uc := &ReviewUseCase{
				reviewRepo: moqReviewRepo,
				albumRepo:  moqAlbumRepo,
				userRepo:   moqUserRepo,
			}
			got, err := uc.Update(tt.args.ctx, tt.args.review)
			if (err != nil) != tt.wantErr {
				t.Errorf("ReviewUseCase.Update() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("ReviewUseCase.Update() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestReviewUseCase_DeleteById(t *testing.T) {
	t.Parallel()

	type args struct {
		ctx      context.Context
		reviewId string
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		{
			name: "正常系",
			args: args{
				ctx:      context.Background(),
				reviewId: "reviewId",
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			moqReviewRepo := &ReviewRepositoryMock{}
			moqReviewRepo.DeleteByIdFunc = func(pctx context.Context, reviewId string) error {
				return nil
			}

			uc := &ReviewUseCase{
				reviewRepo: moqReviewRepo,
			}
			if err := uc.DeleteById(tt.args.ctx, tt.args.reviewId); (err != nil) != tt.wantErr {
				t.Errorf("ReviewUseCase.DeleteById() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
