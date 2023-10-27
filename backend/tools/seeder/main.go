package main

import (
	"context"
	"errors"
	"log"
	"log/slog"

	"github.com/joho/godotenv"
	"github.com/kngnkg/tunetrail/backend/config"
	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
	"github.com/kngnkg/tunetrail/backend/logger"
	"github.com/kngnkg/tunetrail/backend/testutil/fixture"
)

type seeder struct {
	db repository.DBAccesser
	rr *repository.ReviewRepository
	ur *repository.UserRepository
}

// DBの初期化
func (s *seeder) initDB(ctx context.Context, tx repository.Transactioner) error {
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

func (s *seeder) storeRandomUsers(ctx context.Context, tx repository.Transactioner) ([]*entity.User, error) {
	var users []*entity.User
	for i := 0; i < 100; i++ {
		users = append(users, fixture.User(nil))
	}

	for _, user := range users {
		u, err := s.ur.StoreUser(ctx, tx, user)
		if err != nil {
			return nil, err
		}

		users = append(users, u)
	}

	return users, nil
}

func (s *seeder) storeRandomReviews(ctx context.Context, tx repository.Transactioner, authorIds []entity.ImmutableId, albumIds []string) ([]*entity.Review, error) {
	var reviews []*entity.Review
	for i := 0; i < 100; i++ {
		r := fixture.Review(&entity.Review{
			Author:  fixture.Author(&entity.Author{ImmutableId: authorIds[i]}),
			AlbumId: albumIds[i],
		})

		reviews = append(reviews, r)
	}

	for _, review := range reviews {
		r, err := s.rr.StoreReview(ctx, tx, review)
		if err != nil {
			return nil, err
		}

		reviews = append(reviews, r)
	}

	return reviews, nil
}

func (s *seeder) exec(ctx context.Context) error {
	// TODO: 適当なアルバムを取得する
	var albumIds []string
	for i := 0; i < 100; i++ {
		albumIds = append(albumIds, "6dVIqQ8qmQ5GBnJ9shOYGE")
	}

	tx, err := s.db.BeginTxx(ctx, nil)
	if err != nil {
		return err
	}

	logger.FromContent(ctx).Info("initializing db...")
	if err := s.initDB(ctx, tx); err != nil {
		tx.Rollback()
		return err
	}

	logger.FromContent(ctx).Info("storeing random users...")
	users, err := s.storeRandomUsers(ctx, tx)
	if err != nil {
		tx.Rollback()
		return err
	}

	var authorIds []entity.ImmutableId
	for _, user := range users {
		authorIds = append(authorIds, user.ImmutableId)
	}

	logger.FromContent(ctx).Info("storing random reviews...")
	for i := 0; i < 3; i++ {
		_, err = s.storeRandomReviews(ctx, tx, authorIds, albumIds)
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	return tx.Commit()
}

// 開発環境用のデータを生成する
func main() {
	l := logger.New(&logger.LoggerOptions{
		Level: slog.LevelDebug,
	})
	ctx := logger.WithContent(context.Background(), l)

	// .envファイルを読み込む
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	cfg, err := config.New()
	if err != nil {
		l.Fatal("failed to load config.", err)
	}

	if cfg.Env != "dev" {
		l.Fatal("this command is only for development.", errors.New("invalid env"))
	}

	db, close, err := repository.NewDB(&repository.DBConfig{
		Host:     cfg.DBHost,
		Port:     cfg.DBPort,
		User:     cfg.DBUser,
		Password: cfg.DBPassword,
		DBName:   cfg.DBName,
		SSLMode:  "disable",
	})
	if err != nil {
		l.Fatal("failed to connect to db.", err)
	}
	defer close()

	ur := &repository.UserRepository{}
	rr := &repository.ReviewRepository{}

	seeder := &seeder{
		db: db,
		ur: ur,
		rr: rr,
	}

	if err = seeder.exec(ctx); err != nil {
		l.Fatal("failed to execute seeder.", err)
	}

	l.Info("seeder finished.")
}