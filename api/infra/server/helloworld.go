package server

import (
	"context"

	helloworld "github.com/kngnkg/tunetrail/api/gen/go/hello_world"
)

// helloworldServerはhelloworld.GreeterServerインターフェースを満たす必要がある
type helloworldServer struct {
	helloworld.UnimplementedGreeterServer
}

func NewHelloworldServer() helloworld.GreeterServer {
	return &helloworldServer{}
}

func (s *helloworldServer) SayHello(ctx context.Context, in *helloworld.HelloRequest) (*helloworld.HelloReply, error) {
	return &helloworld.HelloReply{Message: "Hello " + in.Name}, nil
}
