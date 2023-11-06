package validator

import (
	"regexp"
	"unicode"

	"github.com/go-playground/validator"
)

const AlbumIdLength = 22

type Validator struct {
	validator *validator.Validate
}

func New() *Validator {
	v := validator.New()
	if err := v.RegisterValidation("username", isDisplayIdValid); err != nil {
		panic(err)
	}

	if err := v.RegisterValidation("published_status", isPublishedStatusValid); err != nil {
		panic(err)
	}

	if err := v.RegisterValidation("album_id", isAlbumIdValid); err != nil {
		panic(err)
	}

	return &Validator{
		validator: v,
	}
}

func (v *Validator) Validate(i interface{}) error {
	// TODO: 詳細なエラーを返す
	return v.validator.Struct(i)
}

func isDisplayIdValid(fl validator.FieldLevel) bool {
	re := regexp.MustCompile(`^[a-zA-Z0-9_]{4,20}$`)
	return re.MatchString(fl.Field().String())
}

func isPublishedStatusValid(fl validator.FieldLevel) bool {
	switch fl.Field().String() {
	case "published", "draft", "unlisted":
		return true
	default:
		return false
	}
}

func isAlbumIdValid(fl validator.FieldLevel) bool {
	field := fl.Field().String()
	if len(field) != AlbumIdLength {
		return false
	}
	// すべての文字が英数字であることを確認
	for _, r := range field {
		if !unicode.IsLetter(r) && !unicode.IsNumber(r) {
			return false
		}
	}
	return true
}
