package jwt

import (
	"context"
	"time"

	"github.com/kngnkg/foderee/backend/entity"
	"github.com/kngnkg/foderee/backend/logger"
	"github.com/lestrrat-go/jwx/jwk"
	"github.com/lestrrat-go/jwx/jwt"
)

type JWTerConfig struct {
	AcceptableSkew time.Duration
	JWKUrl         string
}

type JWTer struct {
	acceptableSkew time.Duration
	keySet         jwk.Set
}

func NewJWTer(ctx context.Context, cfg *JWTerConfig) (*JWTer, error) {
	// TODO: 非同期で定期的に更新する
	keySet, err := jwk.Fetch(ctx, cfg.JWKUrl)
	if err != nil {
		return nil, err
	}

	logger.FromContext(ctx).Info("fetched jwk set")

	j := &JWTer{
		acceptableSkew: cfg.AcceptableSkew,
		keySet:         keySet,
	}

	return j, nil
}

func (j *JWTer) Parse(ctx context.Context, tokenString string) (*entity.IDToken, error) {
	verified, err := jwt.Parse(
		[]byte(tokenString),
		jwt.WithKeySet(j.keySet),
		jwt.WithValidate(true),
		jwt.WithAcceptableSkew(j.acceptableSkew),
	)
	if err != nil {
		return nil, err
	}

	token := &entity.IDToken{
		Sub:      verified.Subject(),
		Email:    verified.PrivateClaims()["email"].(string),
		Username: verified.PrivateClaims()["cognito:username"].(string),
	}

	return token, nil
}
