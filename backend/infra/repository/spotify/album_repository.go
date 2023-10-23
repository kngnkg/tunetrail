package spotify

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/zmb3/spotify/v2"
)

type AlbumRepository struct {
	SpotifyClient *SpotifyClient
}

func (r *AlbumRepository) GetAlbumInfo(ctx context.Context, albumId string) (*entity.Album, *entity.TrackPage, error) {
	res, err := r.SpotifyClient.GetAlbum(ctx, spotify.ID(albumId))
	if err != nil {
		return nil, nil, err
	}

	var artists []*entity.SimpleArtist
	for _, a := range res.Artists {
		artists = append(artists, simpleArtist(&a))
	}

	a := &entity.Album{
		AlbumId:     res.ID.String(),
		SpotifyUri:  string(res.URI),
		SpotifyUrl:  res.ExternalURLs["spotify"],
		Name:        res.Name,
		Artists:     artists,
		CoverUrl:    res.Images[0].URL,
		ReleaseDate: res.ReleaseDateTime(),
		Genres:      res.Genres,
	}

	tp := trackPage(&res.Tracks)

	return a, tp, nil
}

// func (r *AlbumRepository) GetAlbumTracksById(ctx context.Context, albumId string) (*entity.TrackPage, error) {
// 	res, err := r.SpotifyClient.GetAlbumTracks(ctx, spotify.ID(albumId))
// 	if err != nil {
// 		return nil, err
// 	}

// 	tp := trackPage(res)
// 	return tp, nil
// }

func simpleArtist(artist *spotify.SimpleArtist) *entity.SimpleArtist {
	return &entity.SimpleArtist{
		ArtistId:   artist.ID.String(),
		SpotifyUri: string(artist.URI),
		SpotifyUrl: artist.ExternalURLs["spotify"],
		Name:       artist.Name,
	}
}

func track(tp *spotify.SimpleTrack) *entity.Track {
	return &entity.Track{
		TrackId:     tp.ID.String(),
		SpotifyUri:  string(tp.URI),
		SpotifyUrl:  tp.ExternalURLs["spotify"],
		Title:       tp.Name,
		DurationMs:  tp.Duration,
		TrackNumber: tp.TrackNumber,
		PreviewUrl:  tp.PreviewURL,
	}
}

func trackPage(tp *spotify.SimpleTrackPage) *entity.TrackPage {
	var ts []*entity.Track
	for _, t := range tp.Tracks {
		ts = append(ts, track(&t))
	}

	return &entity.TrackPage{
		Tracks:   ts,
		Limit:    tp.Limit,
		Offset:   tp.Offset,
		Total:    tp.Total,
		Next:     tp.Next,
		Previous: tp.Previous,
	}
}
