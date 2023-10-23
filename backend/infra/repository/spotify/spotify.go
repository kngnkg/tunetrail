package spotify

import (
	"context"

	"github.com/zmb3/spotify/v2"
	spotifyauth "github.com/zmb3/spotify/v2/auth"
	"golang.org/x/oauth2/clientcredentials"
)

type SpotifyClient struct {
	*spotify.Client
}

type SpotifyClientConfig struct {
	SpotifyId     string
	SpotifySecret string
}

func NewSpotifyClient(ctx context.Context, cfg *SpotifyClientConfig) (*SpotifyClient, error) {
	config := &clientcredentials.Config{
		ClientID:     cfg.SpotifyId,
		ClientSecret: cfg.SpotifySecret,
		TokenURL:     spotifyauth.TokenURL,
	}

	token, err := config.Token(ctx)
	if err != nil {
		return nil, err
	}

	httpClient := spotifyauth.New().Client(ctx, token)
	client := spotify.New(httpClient)

	return &SpotifyClient{client}, nil
}
