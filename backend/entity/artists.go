package entity

type SimpleArtist struct {
	ArtistId   string // Spotify ID
	SpotifyUri string
	SpotifyUrl string
	Name       string
}

type Artist struct {
	SimpleArtist
	ImageUrl string
	Genres   []string
}
