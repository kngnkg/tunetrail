package spotify

import (
	"context"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/zmb3/spotify/v2"
)

type AlbumRepository struct {
	SpotifyClient *SpotifyClient
}

func (r *AlbumRepository) ListAlbums(ctx context.Context, albumIds []string) ([]*entity.Album, []*entity.TrackPage, error) {
	var ids []spotify.ID
	for _, id := range albumIds {
		ids = append(ids, spotify.ID(id))
	}

	res, err := r.SpotifyClient.GetAlbums(ctx, ids)
	if err != nil {
		return nil, nil, err
	}

	var as []*entity.Album
	for _, a := range res {
		as = append(as, toAlbum(a))
	}

	var tps []*entity.TrackPage
	for _, a := range res {
		tps = append(tps, toTrackPage(&a.Tracks))
	}

	return as, tps, nil
}

func (r *AlbumRepository) GetAlbumInfoById(ctx context.Context, albumId string) (*entity.Album, *entity.TrackPage, error) {
	res, err := r.SpotifyClient.GetAlbum(ctx, spotify.ID(albumId))
	if err != nil {
		return nil, nil, err
	}

	a := toAlbum(res)
	tp := toTrackPage(&res.Tracks)

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

func toAlbum(res *spotify.FullAlbum) *entity.Album {
	return &entity.Album{
		AlbumId:     res.ID.String(),
		SpotifyUri:  string(res.URI),
		SpotifyUrl:  res.ExternalURLs["spotify"],
		Name:        res.Name,
		Artists:     toSimpleArtists(res.Artists),
		CoverUrl:    res.Images[0].URL,
		ReleaseDate: res.ReleaseDateTime(),
		Genres:      res.Genres,
	}
}

func toSimpleArtists(artists []spotify.SimpleArtist) []*entity.SimpleArtist {
	var as []*entity.SimpleArtist
	for _, a := range artists {
		as = append(as, toSimpleArtist(&a))
	}

	return as
}

func toSimpleArtist(artist *spotify.SimpleArtist) *entity.SimpleArtist {
	return &entity.SimpleArtist{
		ArtistId:   artist.ID.String(),
		SpotifyUri: string(artist.URI),
		SpotifyUrl: artist.ExternalURLs["spotify"],
		Name:       artist.Name,
	}
}

func toTrack(tp *spotify.SimpleTrack) *entity.Track {
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

func toTrackPage(tp *spotify.SimpleTrackPage) *entity.TrackPage {
	var ts []*entity.Track
	for _, t := range tp.Tracks {
		ts = append(ts, toTrack(&t))
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
