package repository

import (
	"context"
	"database/sql"

	"github.com/jmoiron/sqlx"
)

type DBAccesser interface {
	Beginner
	Executor
}

type Transactioner interface {
	Commit() error
	Rollback() error
	Executor
}

type Beginner interface {
	BeginTxx(ctx context.Context, opts *sql.TxOptions) (Transactioner, error)
}

// Executor は sqlx.DB と sqlx.Tx の両方で実装されているメソッドを統一的に扱うためのインターフェース
type Executor interface {
	PreparexContext(ctx context.Context, query string) (*sqlx.Stmt, error)
	QueryxContext(ctx context.Context, query string, args ...any) (*sqlx.Rows, error)
	QueryRowxContext(ctx context.Context, query string, args ...any) *sqlx.Row
	GetContext(ctx context.Context, dest interface{}, query string, args ...any) error
	SelectContext(ctx context.Context, dest interface{}, query string, args ...any) error
	ExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)
	NamedExecContext(ctx context.Context, query string, arg interface{}) (sql.Result, error)
}

var (
	_ Executor = (*sqlx.DB)(nil)
	_ Executor = (*sqlx.Tx)(nil)
)
