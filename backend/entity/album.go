package entity

import "time"

type Album struct {
	AlbumId     string // Spotify ID
	SpotifyUri  string
	SpotifyUrl  string
	Name        string
	Artists     []*SimpleArtist
	CoverUrl    string
	ReleaseDate time.Time
	Genres      []string
}

type Track struct {
	TrackId     string // Spotify ID
	SpotifyUri  string
	SpotifyUrl  string
	Title       string
	DurationMs  int
	TrackNumber int
	PreviewUrl  string
}

type TrackPage struct {
	Tracks   []*Track
	Limit    int
	Offset   int
	Total    int
	Next     string
	Previous string
}
