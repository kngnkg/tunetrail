package entity

import "encoding/base64"

const DefaultLimit = 20

type Cursor string

func EncodeToCursor(input string) Cursor {
	encorded := base64.StdEncoding.EncodeToString([]byte(input))
	return Cursor(encorded)
}

func (c Cursor) Decode() (string, error) {
	decoded, err := base64.StdEncoding.DecodeString(string(c))
	if err != nil {
		return "", err
	}
	return string(decoded), nil
}

type Page struct {
	Cursor Cursor
	Limit  int
}

type PageOption func(*Page) error

func WithCursor(cursor Cursor) PageOption {
	return func(p *Page) error {
		p.Cursor = cursor
		return nil
	}
}

func WithLimit(limit int) PageOption {
	return func(p *Page) error {
		p.Limit = limit
		return nil
	}
}

func NewPage(opts ...PageOption) *Page {
	page := &Page{
		Cursor: "",
		Limit:  DefaultLimit,
	}

	for _, opt := range opts {
		opt(page)
	}

	return page
}
