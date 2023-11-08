package server

import (
	"context"
	"fmt"

	"github.com/kngnkg/tunetrail/backend/logger"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func RecoveryFunc(ctx context.Context, p interface{}) error {
	logger.FromContext(ctx).Error("panic", fmt.Errorf("panic occured: %+v", p))
	return status.Error(codes.Internal, "Unexpected error")
}
