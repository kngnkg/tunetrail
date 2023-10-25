package server

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/logger"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func handleError(ctx context.Context, code codes.Code, msg string, err error) error {
	if err != nil {
		logger.FromContent(ctx).Error(msg, err)
	}
	return status.Error(code, msg)
}

func internal(ctx context.Context, err error) error {
	return handleError(ctx, codes.Internal, "internal server error", err)
}

func invalidArgument(ctx context.Context, err error) error {
	return handleError(ctx, codes.InvalidArgument, "invalid request", err)
}

func notFound(ctx context.Context, err error) error {
	return handleError(ctx, codes.NotFound, "not found", err)
}

func alreadyExists(ctx context.Context, err error) error {
	return handleError(ctx, codes.AlreadyExists, "already exists", err)
}
