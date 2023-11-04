package jwt

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/logger"
	"github.com/lestrrat-go/jwx/jwk"
	"github.com/lestrrat-go/jwx/jwt"
)

type JWTer struct {
	keySet jwk.Set
}

func NewJWTer(ctx context.Context, jwkUrl string) (*JWTer, error) {
	// TODO: 非同期で定期的に更新する
	keySet, err := jwk.Fetch(ctx, jwkUrl)
	if err != nil {
		return nil, err
	}

	logger.FromContext(ctx).Info("fetched jwk set")

	j := &JWTer{
		keySet: keySet,
	}

	return j, nil
}

func (j *JWTer) Parse(ctx context.Context, tokenString string) (*entity.IDToken, error) {
	verified, err := jwt.Parse([]byte(tokenString), jwt.WithKeySet(j.keySet), jwt.WithValidate(true))
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
