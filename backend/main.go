package main

import (
	"context"
	"fmt"
	"log/slog"
	"net"
	"strconv"
	"time"

	grpc_recovery "github.com/grpc-ecosystem/go-grpc-middleware/recovery"
	"github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/auth"
	"github.com/kngnkg/foderee/backend/config"
	"github.com/kngnkg/foderee/backend/gen/follow"
	helloworld "github.com/kngnkg/foderee/backend/gen/helloworld"
	"github.com/kngnkg/foderee/backend/gen/like"
	"github.com/kngnkg/foderee/backend/gen/review"
	user "github.com/kngnkg/foderee/backend/gen/user"
	"github.com/kngnkg/foderee/backend/infra/repository"
	"github.com/kngnkg/foderee/backend/infra/server"
	"github.com/kngnkg/foderee/backend/jwt"
	"github.com/kngnkg/foderee/backend/logger"
	"github.com/kngnkg/foderee/backend/usecase"
	"github.com/kngnkg/foderee/backend/validator"
	"google.golang.org/grpc"
	healthpb "google.golang.org/grpc/health/grpc_health_v1"
	"google.golang.org/grpc/reflection"
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
	if cfg.Env == "local" {
		sslMode = "disable" // ローカル環境の場合はSSL通信を無効にする
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
	fr := &repository.FollowRepository{}
	lr := &repository.LikeRepository{}

	userUc := usecase.NewUserUseCase(db, ur, fr)
	reviewUc := usecase.NewReviewUseCase(db, rr, ur, lr)
	followUc := usecase.NewFollowUseCase(db, ur, fr)
	likeUc := usecase.NewLikeUseCase(db, ur, rr, lr)

	li := server.NewLoggingInterceptor(l)

	j, err := jwt.NewJWTer(logger.WithContext(context.TODO(), l), &jwt.JWTerConfig{
		AcceptableSkew: time.Duration(cfg.JWTAcceptableSkewMinute) * time.Minute,
		JWKUrl:         cfg.CognitoJWKUrl,
	})
	if err != nil {
		l.Fatal("failed to create JWTer.", err)
	}

	au := server.NewAuth(j)

	opts := []grpc_recovery.Option{
		grpc_recovery.WithRecoveryHandlerContext(server.RecoveryFunc),
	}

	s := grpc.NewServer(
		grpc.ChainUnaryInterceptor(
			li.UnaryLoggingInterceptor,
			auth.UnaryServerInterceptor(au.AuthFunc),
			grpc_recovery.UnaryServerInterceptor(opts...),
		),
	)

	healthServer := server.NewHealthServer()
	healthpb.RegisterHealthServer(s, healthServer)

	v := validator.New()

	helloworldServer := server.NewHelloworldServer(au)
	helloworld.RegisterGreeterServer(s, helloworldServer)

	userServer := server.NewUserServer(au, v, userUc)
	user.RegisterUserServiceServer(s, userServer)

	reviewServer := server.NewReviewServer(au, v, reviewUc)
	review.RegisterReviewServiceServer(s, reviewServer)

	followServer := server.NewFollowServer(au, v, followUc)
	follow.RegisterFollowServiceServer(s, followServer)

	likeServer := server.NewLikeServer(au, v, likeUc)
	like.RegisterLikeServiceServer(s, likeServer)

	reflection.Register(s)

	lis, err := net.Listen("tcp", fmt.Sprintf(":%v", cfg.Port))
	if err != nil {
		l.Fatal("failed to listen.", err)
	}

	l.Info("gRPC server started.", "port", strconv.Itoa(cfg.Port))
	if err := s.Serve(lis); err != nil {
		l.Fatal("failed to serve.", err)
	}
}
