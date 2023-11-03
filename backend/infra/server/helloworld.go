package server

import (
	"context"
	"log/slog"

	helloworld "github.com/kngnkg/tunetrail/backend/gen/helloworld"
	"github.com/kngnkg/tunetrail/backend/logger"
)

// helloworldServerはhelloworld.GreeterServerインターフェースを満たす必要がある
type helloworldServer struct {
	helloworld.UnimplementedGreeterServer
}

func NewHelloworldServer() helloworld.GreeterServer {
	return &helloworldServer{}
}

func (s *helloworldServer) SayHello(ctx context.Context, in *helloworld.HelloRequest) (*helloworld.HelloReply, error) {
	logger.FromContext(ctx).Info("SayHello", slog.Any("in", in))
	return &helloworld.HelloReply{Message: "Hello " + in.Name}, nil
}
