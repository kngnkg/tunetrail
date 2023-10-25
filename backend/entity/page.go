package entity

type Page struct {
	Cursor string
	Limit  int
}

const DefaultLimit = 20

func NewPage(cursor string, limit int) *Page {
	if limit == 0 {
		limit = DefaultLimit
	}

	return &Page{
		Cursor: cursor,
		Limit:  limit,
	}
}
