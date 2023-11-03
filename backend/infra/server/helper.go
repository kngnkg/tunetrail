package server

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func invalidArgument(ctx context.Context, err error) error {
	return status.Error(codes.InvalidArgument, "invalid request")
}

func notFound(ctx context.Context, err error) error {
	return status.Error(codes.NotFound, "not found")
}

func alreadyExists(ctx context.Context, err error) error {
	return status.Error(codes.AlreadyExists, "already exists")
}

func internal(ctx context.Context, err error) error {
	return status.Error(codes.Internal, "internal server error")
}

func unauthenticated(ctx context.Context, err error) error {
	return status.Error(codes.Unauthenticated, "unauthenticated")
}
