package server

import (
	"context"
	"log/slog"

	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/auth"
	helloworld "github.com/kngnkg/tunetrail/backend/gen/helloworld"
	"github.com/kngnkg/tunetrail/backend/logger"
)

// helloworldServerはhelloworld.GreeterServerインターフェースを満たす必要がある
type helloworldServer struct {
	helloworld.UnimplementedGreeterServer
	auth *Auth
}

func NewHelloworldServer(a *Auth) helloworld.GreeterServer {
	return &helloworldServer{auth: a}
}

// 認証を必要とするメソッドを定義
var authRequiredMethodsHW = map[string]bool{
	"/helloworld.Greeter/SayHello": false,
}

var _ grpc_auth.ServiceAuthFuncOverride = (*helloworldServer)(nil)

func (s *helloworldServer) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
	logger.FromContext(ctx).Debug("AuthFuncOverride")

	// 認証を必要とするメソッドであるかどうかを判定
	if authRequiredMethodsHW[fullMethodName] {
		return s.auth.AuthFunc(ctx)
	}

	return ctx, nil
}

func (s *helloworldServer) SayHello(ctx context.Context, in *helloworld.HelloRequest) (*helloworld.HelloReply, error) {
	logger.FromContext(ctx).Info("SayHello", slog.Any("in", in))
	return &helloworld.HelloReply{Message: "Hello " + in.Name}, nil
}
