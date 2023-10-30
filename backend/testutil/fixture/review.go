package fixture

import (
	"encoding/json"
	"math/rand"
	"time"

	"github.com/kngnkg/tunetrail/backend/entity"
	"github.com/kngnkg/tunetrail/backend/testutil"
)

func Review(r *entity.Review) *entity.Review {
	content := `{
		"blocks": [
		  {
			"id": "2ptJX9WGwr",
			"type": "paragraph",
			"data": { "text": "本文本文本文本文本文本文本文本文本文本文本文本文" }
		  },
		  {
			"id": "hsGkpvbgcL",
			"type": "header",
			"data": { "text": "ヘッダー2ヘッダー2ヘッダー2ヘッダー2", "level": 2 }
		  },
		  {
			"id": "uy6s8DC1TW",
			"type": "paragraph",
			"data": {
			  "text": "本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文"
			}
		  },
		  {
			"id": "b_PRkN4qW5",
			"type": "header",
			"data": {
			  "text": "ヘッダー3ヘッダー3ヘッダー3ヘッダー3ヘッダー3",
			  "level": 3
			}
		  },
		  {
			"id": "zg_iXTTBDQ",
			"type": "paragraph",
			"data": { "text": "本文本文本文本文本文本文本文本文本文本文本文本文" }
		  },
		  {
			"id": "y1Q0HwojNi",
			"type": "list",
			"data": { "style": "unordered", "items": ["リスト", "リスト"] }
		  },
		  {
			"id": "tlbWzvQTbr",
			"type": "header",
			"data": { "text": "ヘッダー2ヘッダー2ヘッダー2", "level": 2 }
		  },
		  {
			"id": "H5qn4LN7B-",
			"type": "quote",
			"data": {
			  "text": "引用引用引用引用引用引用引用引用引用引用",
			  "caption": "キャプション",
			  "alignment": "left"
			}
		  },
		  {
			"id": "BCRYId-FcY",
			"type": "paragraph",
			"data": { "text": "本文本文本文本文" }
		  }
		]
	  }`

	result := &entity.Review{
		ReviewId:        testutil.GenRandomUUID(),
		PublishedStatus: genRandomPublishedStatus(),
		Author:          Author(nil),
		AlbumId:         testutil.GenRamdomString(22),
		Title:           "タイトル" + testutil.GenRamdomString(20),
		Content:         json.RawMessage(content),
		LikesCount:      rand.Int(),
		CreatedAt:       time.Now(),
		UpdatedAt:       time.Now(),
	}
	if r == nil {
		return result
	}
	if r.ReviewId != "" {
		result.ReviewId = r.ReviewId
	}
	if r.PublishedStatus != "" {
		result.PublishedStatus = r.PublishedStatus
	}
	if r.Author != nil {
		result.Author = r.Author
	}
	if r.AlbumId != "" {
		result.AlbumId = r.AlbumId
	}
	if r.Title != "" {
		result.Title = r.Title
	}
	if r.Content != nil {
		result.Content = r.Content
	}
	if r.LikesCount != 0 {
		result.LikesCount = r.LikesCount
	}
	if !r.CreatedAt.IsZero() {
		result.CreatedAt = r.CreatedAt
	}
	if !r.UpdatedAt.IsZero() {
		result.UpdatedAt = r.UpdatedAt
	}
	return result
}

func genRandomPublishedStatus() entity.PublishedStatus {
	switch rand.Intn(3) {
	case 0:
		return entity.Published
	case 1:
		return entity.Draft
	case 2:
		return entity.UnListed
	default:
		return entity.Published
	}
}
