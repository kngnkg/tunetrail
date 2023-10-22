package postgres

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/jmoiron/sqlx"
	"github.com/kngnkg/tunetrail/backend/config"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
	_ "github.com/lib/pq"
)

type DB struct {
	*sqlx.DB
}

func NewDb(cfg *config.Config) (*DB, func(), error) {
	sslMode := "require"
	if cfg.Env == "dev" {
		sslMode = "disable" // 開発環境の場合はSSL通信を無効にする
	}

	db, err := sqlx.Connect("postgres", fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName, sslMode,
	))
	if err != nil {
		return nil, func() {}, err
	}

	return &DB{db}, func() { _ = db.Close() }, nil
}

// BeginTxx はトランザクションを開始する
func (db *DB) BeginTxx(ctx context.Context, opts *sql.TxOptions) (repository.Transactioner, error) {
	return db.DB.BeginTxx(ctx, opts)
}

var (
	_ repository.DBAccesser = (*DB)(nil)
	_ repository.Beginner   = (*DB)(nil)
)
