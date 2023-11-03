package server

import (
	"context"
	"fmt"
	"log/slog"

	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/auth"
	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/logger"
)

var tokenInfoKey struct{}

type JWTer interface {
	Parse(ctx context.Context, token string) (*entity.IDToken, error)
}

type Auth struct {
	j JWTer
}

func NewAuth(j JWTer) *Auth {
	return &Auth{
		j: j,
	}
}

func (i *Auth) AuthFunc(ctx context.Context) (context.Context, error) {
	logger.FromContext(ctx).Debug("AuthFunc")

	tokenString, err := grpc_auth.AuthFromMD(ctx, "bearer")
	if err != nil {
		return nil, err
	}

	logger.FromContext(ctx).Debug(fmt.Sprintf("tokenString: %s", tokenString))

	token, err := i.j.Parse(ctx, tokenString)
	if err != nil {
		logger.FromContext(ctx).Debug(fmt.Sprintf("unauthorized. token: %s", token))
		return nil, unauthenticated(ctx, err)
	}

	ctx = logger.WithFields(ctx,
		slog.Group("auth",
			slog.String("sub", token.Sub),
		),
	)

	logger.FromContext(ctx).Debug(fmt.Sprintf("authorized. token: %s", token))

	// WARNING: In production define your own type to avoid context collisions.
	return context.WithValue(ctx, tokenInfoKey, token), nil
}
