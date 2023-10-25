package fixture

import (
	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/testutil"
)

func SimpleArtist(a *entity.SimpleArtist) *entity.SimpleArtist {
	id := testutil.GenRamdomString(spotifyIdLength)
	result := &entity.SimpleArtist{
		ArtistId:   id,
		SpotifyUri: "spotify:artist:" + id,
		SpotifyUrl: "https://open.spotify.com/artist/" + id,
		Name:       "artist name",
	}
	if a == nil {
		return result
	}
	if a.ArtistId != "" {
		result.ArtistId = a.ArtistId
	}
	if a.SpotifyUri != "" {
		result.SpotifyUri = a.SpotifyUri
	}
	if a.SpotifyUrl != "" {
		result.SpotifyUrl = a.SpotifyUrl
	}
	if a.Name != "" {
		result.Name = a.Name
	}
	return result
}

func Artist(a *entity.Artist) *entity.Artist {
	result := &entity.Artist{
		SimpleArtist: *SimpleArtist(nil),
		ImageUrl:     "https://example.com/image.png",
		Genres:       []string{"genre1", "genre2"},
	}
	if a == nil {
		return result
	}
	if a.ImageUrl != "" {
		result.ImageUrl = a.ImageUrl
	}
	if a.Genres != nil {
		result.Genres = a.Genres
	}
	return result
}
