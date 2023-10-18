package main

import (
	"log/slog"
	"net"

	helloworld "github.com/kngnkg/tunetrail/api/gen/go/hello_world"
	"github.com/kngnkg/tunetrail/api/infra/server"
	"github.com/kngnkg/tunetrail/api/logger"

	"google.golang.org/grpc"
)

func main() {
	l := logger.New(logger.LoggerOptions{
		Level: slog.LevelDebug,
	})

	s := grpc.NewServer()

	helloworldServer := server.NewHelloworldServer()
	helloworld.RegisterGreeterServer(s, helloworldServer)

	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		l.Fatal("failed to listen.", err)
	}

	l.Info("gRPC server started.", "port", "50051")
	if err := s.Serve(lis); err != nil {
		l.Fatal("failed to serve.", err)
	}
}
