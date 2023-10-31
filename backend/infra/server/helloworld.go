package server

import (
	"context"

	helloworld "github.com/kngnkg/tunetrail/backend/gen/helloworld"
	"github.com/kngnkg/tunetrail/backend/logger"
)

// helloworldServerはhelloworld.GreeterServerインターフェースを満たす必要がある
type helloworldServer struct {
	helloworld.UnimplementedGreeterServer
	logger *logger.Logger
}

func NewHelloworldServer(l *logger.Logger) helloworld.GreeterServer {
	return &helloworldServer{logger: l}
}

func (s *helloworldServer) SayHello(ctx context.Context, in *helloworld.HelloRequest) (*helloworld.HelloReply, error) {
	ctx = logger.WithContent(ctx, s.logger)
	logger.FromContent(ctx).Info("SayHello", in)
	return &helloworld.HelloReply{Message: "Hello " + in.Name}, nil
}
