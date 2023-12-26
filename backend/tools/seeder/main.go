package main

import (
	"context"
	"flag"
	"log/slog"
	"math/rand"

	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/infra/repository"
	"github.com/kngnkg/foderee/backend/logger"
	"github.com/kngnkg/foderee/backend/testutil/fixture"
	"github.com/kngnkg/foderee/backend/validator"
)

type seeder struct {
	v  *validator.Validator
	db repository.DBAccesser
	rr *repository.ReviewRepository
	ur *repository.UserRepository
	fr *repository.FollowRepository
	lr *repository.LikeRepository
}

// DBの初期化
func (s *seeder) initDB(ctx context.Context, tx repository.DBAccesser) error {
	_, err := tx.ExecContext(ctx, "DELETE FROM reviews")
	if err != nil {
		return err
	}

	_, err = tx.ExecContext(ctx, "DELETE FROM users")
	if err != nil {
		return err
	}

	return nil
}

func (s *seeder) storeRandomUsers(ctx context.Context, tx repository.DBAccesser) ([]*entity.User, error) {
	var users []*entity.User
	for i := 0; i < 100; i++ {
		users = append(users, fixture.User(&entity.User{
			AvatarUrl: "https://source.unsplash.com/random",
		}))
	}

	for _, user := range users {
		u, err := s.ur.StoreUser(ctx, tx, user)
		if err != nil {
			return nil, err
		}

		// idを更新する
		user.ImmutableId = u.ImmutableId
	}

	return users, nil
}

func (s *seeder) storeRandomReviews(ctx context.Context, tx repository.DBAccesser, authorIds []entity.ImmutableId, albumIds []string) ([]*entity.Review, error) {
	var reviews []*entity.Review
	for i := 0; i < 100; i++ {
		r := fixture.Review(&entity.Review{
			Author:  fixture.Author(&entity.Author{ImmutableId: authorIds[i]}),
			AlbumId: albumIds[i],
		})

		reviews = append(reviews, r)
	}

	for _, review := range reviews {
		b := struct {
			Content string `valdator:"required,json"`
		}{
			Content: string(review.Content),
		}

		if err := s.v.Validate(b); err != nil {
			return nil, err
		}

		_, err := s.rr.StoreReview(ctx, tx, review)
		if err != nil {
			return nil, err
		}
	}

	return reviews, nil
}

func (s *seeder) storeRandomFollows(ctx context.Context, tx repository.DBAccesser, immutableIds []entity.ImmutableId) error {
	sourceIds := immutableIds

	for _, sourceId := range sourceIds {
		var targetIds []entity.ImmutableId
		// 自分自身を含めない
		for i, id := range immutableIds {
			if id == sourceId {
				continue
			}

			targetIds = append(targetIds, immutableIds[i])
		}

		// スライスをシャッフルする
		rand.Shuffle(len(targetIds), func(i, j int) {
			targetIds[i], targetIds[j] = targetIds[j], targetIds[i]
		})

		// 25人フォローする
		targetIds = targetIds[:25]

		for _, targetId := range targetIds {
			f := fixture.Follow(&entity.Follow{
				ImmutableId:         sourceId,
				FolloweeImmutableId: targetId,
			})

			_, err := s.fr.StoreFollow(ctx, tx, f)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func (s *seeder) storeRandomLikes(ctx context.Context, tx repository.DBAccesser, immutableIds []entity.ImmutableId, reviewIds []string) error {
	for _, immutableId := range immutableIds {
		for _, reviewId := range reviewIds {
			l := fixture.Like(&entity.Like{
				ImmutableId: immutableId,
				ReviewId:    reviewId,
			})

			_, err := s.lr.StoreLike(ctx, tx, l)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func (s *seeder) exec(ctx context.Context) error {
	// TODO: 適当なアルバムを取得する
	var albumIds []string
	for i := 0; i < 100; i++ {
		albumIds = append(albumIds, "6dVIqQ8qmQ5GBnJ9shOYGE")
	}

	// tx, err := s.db.BeginTxx(ctx, nil)
	// if err != nil {
	// 	return err
	// }

	logger.FromContext(ctx).Info("initializing db...")
	if err := s.initDB(ctx, s.db); err != nil {
		// tx.Rollback()
		return err
	}

	logger.FromContext(ctx).Info("storeing random users...")
	users, err := s.storeRandomUsers(ctx, s.db)
	if err != nil {
		// tx.Rollback()
		return err
	}

	var authorIds []entity.ImmutableId
	for _, user := range users {
		authorIds = append(authorIds, user.ImmutableId)
	}

	logger.FromContext(ctx).Info("storing random follows...")
	if err := s.storeRandomFollows(ctx, s.db, authorIds); err != nil {
		// tx.Rollback()
		return err
	}

	var reviewIds []string

	logger.FromContext(ctx).Info("storing random reviews...")
	for i := 0; i < 3; i++ {
		reviews, err := s.storeRandomReviews(ctx, s.db, authorIds, albumIds)
		if err != nil {
			// tx.Rollback()
			return err
		}

		for _, review := range reviews {
			reviewIds = append(reviewIds, review.ReviewId)
		}
	}

	logger.FromContext(ctx).Info("storing random likes...")
	if err := s.storeRandomLikes(ctx, s.db, authorIds, reviewIds); err != nil {
		// tx.Rollback()
		return err
	}

	// return tx.Commit()
	return nil
}

type seederOptions struct {
	Host     string
	Port     int
	User     string
	Password string
	DBName   string
	SSLMode  string // "disable" or "require"
}

// シードデータを DB に投入する
func main() {
	l := logger.New(&logger.LoggerOptions{
		Level: slog.LevelDebug,
	})
	ctx := logger.WithContext(context.Background(), l)

	opts := seederOptions{}

	flag.StringVar(&opts.Host, "host", "localhost", "データベースホスト")
	flag.IntVar(&opts.Port, "port", 5432, "データベースポート")
	flag.StringVar(&opts.User, "user", "", "データベースユーザー")
	flag.StringVar(&opts.Password, "password", "", "データベースパスワード")
	flag.StringVar(&opts.DBName, "dbname", "", "データベース名")
	flag.StringVar(&opts.SSLMode, "sslmode", "disabled", "SSLモード")

	flag.Parse()

	db, close, err := repository.NewDB(&repository.DBConfig{
		Host:     opts.Host,
		Port:     opts.Port,
		User:     opts.User,
		Password: opts.Password,
		DBName:   opts.DBName,
		SSLMode:  opts.SSLMode,
	})
	if err != nil {
		l.Fatal("failed to connect to db.", err)
	}
	defer close()

	ur := &repository.UserRepository{}
	rr := &repository.ReviewRepository{}
	fr := &repository.FollowRepository{}
	lr := &repository.LikeRepository{}

	v := validator.New()

	seeder := &seeder{
		v:  v,
		db: db,
		ur: ur,
		rr: rr,
		fr: fr,
		lr: lr,
	}

	if err = seeder.exec(ctx); err != nil {
		l.Fatal("failed to execute seeder.", err)
	}

	l.Info("seeder finished.")
}
