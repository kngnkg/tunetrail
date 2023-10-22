package main

import (
	"log/slog"
	"net"

	"github.com/kngnkg/tunetrail/backend/infra/server"
	"github.com/kngnkg/tunetrail/backend/logger"

	helloworld "github.com/kngnkg/tunetrail/backend/gen/helloworld"
	user "github.com/kngnkg/tunetrail/backend/gen/user"
	"google.golang.org/grpc"
)

func main() {
	l := logger.New(&logger.LoggerOptions{
		Level: slog.LevelDebug,
	})

	s := grpc.NewServer()

	helloworldServer := server.NewHelloworldServer()
	helloworld.RegisterGreeterServer(s, helloworldServer)

	userServer := server.NewUserServer()
	user.RegisterUserServiceServer(s, userServer)

	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		l.Fatal("failed to listen.", err)
	}

	l.Info("gRPC server started.", "port", "50051")
	if err := s.Serve(lis); err != nil {
		l.Fatal("failed to serve.", err)
	}
}
