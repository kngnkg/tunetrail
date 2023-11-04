package config

import (
	"github.com/caarlos0/env/v6"
)

// Configは環境変数から取得する設定を表す
type Config struct {
	Env           string `env:"ENV"`
	Port          int    `env:"PORT"`
	DBHost        string `env:"TUNETRAIL_DB_HOST"`
	DBPort        int    `env:"TUNETRAIL_DB_PORT"`
	DBUser        string `env:"TUNETRAIL_DB_USER"`
	DBPassword    string `env:"TUNETRAIL_DB_PASSWORD"`
	DBName        string `env:"TUNETRAIL_DB_NAME"`
	SpotifyId     string `env:"SPOTIFY_ID"`
	SpotifySecret string `env:"SPOTIFY_SECRET"`
	CognitoJWKUrl string `env:"COGNITO_JWK_URL"`
}

// Newは環境変数から設定を取得してConfigを返す
func New() (*Config, error) {
	cfg := &Config{}
	if err := env.Parse(cfg); err != nil {
		return nil, err
	}
	return cfg, nil
}
