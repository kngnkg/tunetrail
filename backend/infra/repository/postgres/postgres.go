package postgres

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/jmoiron/sqlx"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
	_ "github.com/lib/pq"
)

const (
	// 重複エラーコード
	ErrCodePostgresDuplicate = "23505"

	// usersテーブルのユニーク制約
	ConstraintUsersDisplayId = "users_display_id_key"
)

type DB struct {
	*sqlx.DB
}

type DBConfig struct {
	Host     string
	Port     int
	User     string
	Password string
	DBName   string
	SSLMode  string
}

func NewDB(cfg *DBConfig) (*DB, func(), error) {
	db, err := sqlx.Connect("postgres", fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.DBName, cfg.SSLMode,
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
