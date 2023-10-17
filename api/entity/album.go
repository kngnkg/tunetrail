package entity

import "time"

type Album struct {
	AlbumId     string // Spotify ID
	SpotifyUri  string
	SpotifyUrl  string
	Name        string
	DiskNumber  int
	Artists     []Artist
	Tracks      []Track
	CoverUrl    string
	ReleaseDate time.Time
	Genres      []string
}

type Artist struct {
	ArtistId   string // Spotify ID
	SpotifyUri string
	SpotifyUrl string
	Name       string
	ImageUrl   string
	Genres     []string
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
