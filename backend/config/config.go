package config

import (
	"github.com/caarlos0/env/v6"
)

// Configは環境変数から取得する設定を表す
type Config struct {
	Env                     string `env:"ENV"`
	Port                    int    `env:"PORT"`
	DBHost                  string `env:"DB_HOST"`
	DBPort                  int    `env:"DB_PORT"`
	DBUser                  string `env:"DB_USER"`
	DBPassword              string `env:"DB_PASSWORD"`
	DBName                  string `env:"DB_NAME"`
	SpotifyId               string `env:"SPOTIFY_ID"`
	SpotifySecret           string `env:"SPOTIFY_SECRET"`
	CognitoJWKUrl           string `env:"COGNITO_JWK_URL"`
	JWTAcceptableSkewMinute int    `env:"JWT_ACCEPTABLE_SKEW_MINUTE"`
}

// Newは環境変数から設定を取得してConfigを返す
func New() (*Config, error) {
	cfg := &Config{}
	if err := env.Parse(cfg); err != nil {
		return nil, err
	}
	return cfg, nil
}
