package fixture

import (
	"time"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/testutil"
)

const spotifyIdLength = 22

func Album(a *entity.Album) *entity.Album {
	id := testutil.GenRamdomString(spotifyIdLength)
	result := &entity.Album{
		AlbumId:     id,
		SpotifyUri:  "spotify:album:" + id,
		SpotifyUrl:  "https://open.spotify.com/album/" + id,
		Name:        "album name",
		Artists:     []*entity.SimpleArtist{SimpleArtist(nil)},
		CoverUrl:    "https://example.com/cover.png",
		ReleaseDate: time.Now(),
		Genres:      []string{"genre1", "genre2"},
	}
	if a == nil {
		return result
	}
	if a.AlbumId != "" {
		result.AlbumId = a.AlbumId
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
	if a.Artists != nil {
		result.Artists = a.Artists
	}
	// if a.Tracks != nil {
	// 	result.Tracks = a.Tracks
	// }
	if a.CoverUrl != "" {
		result.CoverUrl = a.CoverUrl
	}
	if !a.ReleaseDate.IsZero() {
		result.ReleaseDate = a.ReleaseDate
	}
	if a.Genres != nil {
		result.Genres = a.Genres
	}
	return result
}

func Track(t *entity.Track) *entity.Track {
	id := testutil.GenRamdomString(spotifyIdLength)
	result := &entity.Track{
		TrackId:     id,
		SpotifyUri:  "spotify:track:" + id,
		SpotifyUrl:  "https://open.spotify.com/track/" + id,
		Title:       "track title",
		DurationMs:  1000,
		TrackNumber: 1,
		PreviewUrl:  "https://example.com/preview.mp3",
	}
	if t == nil {
		return result
	}
	if t.TrackId != "" {
		result.TrackId = t.TrackId
	}
	if t.SpotifyUri != "" {
		result.SpotifyUri = t.SpotifyUri
	}
	if t.SpotifyUrl != "" {
		result.SpotifyUrl = t.SpotifyUrl
	}
	if t.Title != "" {
		result.Title = t.Title
	}
	if t.DurationMs != 0 {
		result.DurationMs = t.DurationMs
	}
	if t.TrackNumber != 0 {
		result.TrackNumber = t.TrackNumber
	}
	if t.PreviewUrl != "" {
		result.PreviewUrl = t.PreviewUrl
	}
	return result
}
