package server

import (
	"context"

	"log/slog"

	"github.com/kngnkg/foderee/backend/helper"
	"github.com/kngnkg/foderee/backend/logger"
	"google.golang.org/grpc"
)

type LoggingInterceptor struct {
	logger *logger.Logger
}

func NewLoggingInterceptor(l *logger.Logger) *LoggingInterceptor {
	return &LoggingInterceptor{
		logger: l,
	}
}

func (i *LoggingInterceptor) UnaryLoggingInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	ctx = logger.WithContext(ctx, i.logger)

	ctx = logger.WithFields(ctx,
		slog.Group("request",
			// リクエストに一意なIDを付与
			slog.String("id", helper.GenerateUUID()),
			slog.String("method", info.FullMethod),
		),
	)

	// 本来の処理を実行
	res, err := handler(ctx, req)

	if err != nil {
		logger.FromContext(ctx).Error("error", err)
	}

	return res, err
}
