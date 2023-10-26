package validator

import (
	"regexp"

	"github.com/go-playground/validator"
)

type Validator struct {
	validator *validator.Validate
}

func New() *Validator {
	v := validator.New()
	if err := v.RegisterValidation("username", isDisplayIdValid); err != nil {
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
	re := regexp.MustCompile(`^@[a-zA-Z0-9_]{4,20}$`)
	return re.MatchString(fl.Field().String())
}
