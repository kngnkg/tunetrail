package logger

import (
	"context"
	"fmt"
	"log/slog"
	"os"

	"github.com/cockroachdb/errors"
)

type Logger struct {
	logger *slog.Logger
}

type LoggerOptions struct {
	Level slog.Level
}

func New(opts *LoggerOptions) *Logger {
	options := &slog.HandlerOptions{
		Level: opts.Level,
	}

	handler := slog.NewJSONHandler(os.Stdout, options)

	return &Logger{
		logger: slog.New(handler),
	}
}

type contextKeyLogger string

const contextKey contextKeyLogger = "logger"

// loggerをcontextに埋め込む
func WithContext(content context.Context, logger *Logger) context.Context {
	return context.WithValue(content, contextKey, logger)
}

// 子loggerを作成し、contextに埋め込む
func WithFields(ctx context.Context, keyvals ...any) context.Context {
	return WithContext(ctx, &Logger{
		logger: FromContext(ctx).logger.With(keyvals...),
	})
}

// contextからloggerを取り出す
func FromContext(content context.Context) *Logger {
	logger, ok := content.Value(contextKey).(*Logger)
	if !ok {
		panic("logger not found in context")
	}
	return logger
}

func (l *Logger) Debug(msg string, arg ...any) {
	l.logger.Debug(msg, arg...)
}

func (l *Logger) Info(msg string, arg ...any) {
	l.logger.Info(msg, arg...)
}

func (l *Logger) Warn(msg string, arg ...any) {
	l.logger.Warn(msg, arg...)
}

func (l *Logger) Error(msg string, err error, arg ...any) {
	trace := slog.String("stacktrace", fmt.Sprintf("%+v", errors.WithStack(err)))
	arg = append(arg, trace)

	l.logger.Error(msg, arg...)
}

func (l *Logger) Fatal(msg string, err error, arg ...any) {
	l.Error(msg, err, arg...)
	os.Exit(1)
}
