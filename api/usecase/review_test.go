package usecase

import (
	"context"
	"reflect"
	"testing"

	"github.com/kngnkg/tunetrail/api/entity"
	"github.com/kngnkg/tunetrail/api/testutil/fixture"
	"github.com/stretchr/testify/assert"
)

func TestReviewUseCase_Store(t *testing.T) {
	t.Parallel()

	type args struct {
		ctx    context.Context
		review *entity.Review
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		{
			name: "正常系",
			args: args{
				ctx:    context.Background(),
				review: fixture.Review(nil),
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			moqReviewRepo := &ReviewRepositoryMock{}
			moqReviewRepo.StoreFunc = func(pctx context.Context, review *entity.Review) error {
				assert.Equal(t, tt.args.ctx, pctx)
				assert.Equal(t, tt.args.review, review)
				return nil
			}

			uc := &ReviewUseCase{
				reviewRepo: moqReviewRepo,
			}
			if err := uc.Store(tt.args.ctx, tt.args.review); (err != nil) != tt.wantErr {
				t.Errorf("ReviewUseCase.Store() error = %v, wantErr %v", err, tt.wantErr)
			}
			assert.Equal(t, 1, len(moqReviewRepo.calls.Store))
			assert.Equal(t, tt.args.review, moqReviewRepo.calls.Store[0].Review)
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
