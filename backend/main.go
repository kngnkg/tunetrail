package main

import (
	"fmt"
	"log/slog"
	"net"
	"strconv"

	"github.com/kngnkg/tunetrail/backend/config"
	"github.com/kngnkg/tunetrail/backend/infra/repository"
	"github.com/kngnkg/tunetrail/backend/infra/server"
	"github.com/kngnkg/tunetrail/backend/logger"
	"github.com/kngnkg/tunetrail/backend/usecase"
	"github.com/kngnkg/tunetrail/backend/validator"

	helloworld "github.com/kngnkg/tunetrail/backend/gen/helloworld"
	"github.com/kngnkg/tunetrail/backend/gen/review"
	user "github.com/kngnkg/tunetrail/backend/gen/user"
	"google.golang.org/grpc"
)

func main() {
	l := logger.New(&logger.LoggerOptions{
		Level: slog.LevelDebug,
	})

	cfg, err := config.New()
	if err != nil {
		l.Fatal("failed to load config.", err)
	}

	sslMode := "require"
	if cfg.Env == "dev" {
		sslMode = "disable" // 開発環境の場合はSSL通信を無効にする
	}
	db, close, err := repository.NewDB(&repository.DBConfig{
		Host:     cfg.DBHost,
		Port:     cfg.DBPort,
		User:     cfg.DBUser,
		Password: cfg.DBPassword,
		DBName:   cfg.DBName,
		SSLMode:  sslMode,
	})
	if err != nil {
		l.Fatal("failed to connect to db.", err)
	}
	defer close()

	ur := &repository.UserRepository{}
	rr := &repository.ReviewRepository{}

	userUc := usecase.NewUserUseCase(db, ur)
	reviewUc := usecase.NewReviewUseCase(db, rr, ur)

	li := server.NewLoggingInterceptor(l)

	s := grpc.NewServer(
		grpc.UnaryInterceptor(li.UnaryLoggingInterceptor),
	)

	v := validator.New()

	helloworldServer := server.NewHelloworldServer()
	helloworld.RegisterGreeterServer(s, helloworldServer)

	userServer := server.NewUserServer(userUc, v)
	user.RegisterUserServiceServer(s, userServer)

	reviewServer := server.NewReviewServer(reviewUc, v)
	review.RegisterReviewServiceServer(s, reviewServer)

	lis, err := net.Listen("tcp", fmt.Sprintf(":%v", cfg.Port))
	if err != nil {
		l.Fatal("failed to listen.", err)
	}

	l.Info("gRPC server started.", "port", strconv.Itoa(cfg.Port))
	if err := s.Serve(lis); err != nil {
		l.Fatal("failed to serve.", err)
	}
}
