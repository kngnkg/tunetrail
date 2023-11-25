package server

import (
	"context"
	"log/slog"

	grpc_auth "github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/auth"
	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/logger"
)

type contextKeyTokenInfo string

const contextKey contextKeyTokenInfo = "tokenInfo"

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
	tokenString, err := grpc_auth.AuthFromMD(ctx, "bearer")
	if err != nil {
		return nil, err
	}

	token, err := i.j.Parse(ctx, tokenString)
	if err != nil {
		return nil, unauthenticated(ctx, err)
	}

	ctx = logger.WithFields(ctx,
		slog.Group("auth",
			slog.String("sub", token.Sub),
		),
	)

	return context.WithValue(ctx, contextKey, token), nil
}

func GetToken(ctx context.Context) *entity.IDToken {
	tokenInfo, ok := ctx.Value(contextKey).(*entity.IDToken)
	if !ok {
		panic("tokenInfo not found in context")
	}
	return tokenInfo
}

func GetImmutableId(ctx context.Context) entity.ImmutableId {
	return entity.ImmutableId(GetToken(ctx).Sub)
}
