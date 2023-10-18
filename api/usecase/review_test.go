package usecase

import (
	"context"
	"reflect"
	"testing"

	"github.com/kngnkg/tunetrail/api/entity"
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
		want    *entity.Review
		wantErr bool
	}{
		{
			name: "正常系",
			args: args{
				ctx:    context.Background(),
				review: in,
			},
			want:    fixture.Review(in),
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
				return tt.want, nil
			}
			moqUserRepo.GetByIdFunc = func(pctx context.Context, userId entity.UserId) (*entity.User, error) {
				assert.Equal(t, tt.args.ctx, pctx)
				assert.Equal(t, tt.want.Author.UserId, userId)
				return tt.want.Author, nil
			}
			moqAlbumRepo.GetByIdFunc = func(pctx context.Context, albumId string) (*entity.Album, error) {
				assert.Equal(t, tt.args.ctx, pctx)
				assert.Equal(t, tt.want.Album.AlbumId, albumId)
				return tt.want.Album, nil
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
		want    *entity.Review
		wantErr bool
	}{
		{
			name: "正常系",
			args: args{
				ctx:      context.Background(),
				reviewId: wantReviewId,
			},
			want:    fixture.Review(&entity.Review{ReviewId: wantReviewId}),
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
				return tt.want, nil
			}
			moqUserRepo.GetByIdFunc = func(pctx context.Context, userId entity.UserId) (*entity.User, error) {
				assert.Equal(t, tt.args.ctx, pctx)
				assert.Equal(t, tt.want.Author.UserId, userId)
				return tt.want.Author, nil
			}
			moqAlbumRepo.GetByIdFunc = func(pctx context.Context, albumId string) (*entity.Album, error) {
				assert.Equal(t, tt.args.ctx, pctx)
				assert.Equal(t, tt.want.Album.AlbumId, albumId)
				return tt.want.Album, nil
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
		want       []*entity.Review
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
			want:       prepareReviews(t),
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
				return tt.want, tt.wantCursor, nil
			}
			moqAlbumRepo.GetByIdsFunc = func(pctx context.Context, albumIds []string) ([]*entity.Album, error) {
				var as []*entity.Album
				for _, r := range tt.want {
					as = append(as, r.Album)
				}
				return as, nil
			}
			moqUserRepo.GetByIdFunc = func(pctx context.Context, userId entity.UserId) (*entity.User, error) {
				for _, r := range tt.want {
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
			got, gotCursor, err := uc.GetByAuthorId(tt.args.ctx, tt.args.authorId, tt.args.nextCursor, tt.args.limit)
			if (err != nil) != tt.wantErr {
				t.Errorf("ReviewUseCase.GetByAuthorId() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("ReviewUseCase.GetByAuthorId() got = %v, want %v", got, tt.want)
			}
			if gotCursor != tt.wantCursor {
				t.Errorf("ReviewUseCase.GetByAuthorId() gotCursor = %v, want %v", gotCursor, tt.wantCursor)
			}
		})
	}
}
