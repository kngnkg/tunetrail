package helper

import (
	"encoding/base64"
	"strings"

	"github.com/google/uuid"
)

func RemoveLastComma(s string) string {
	lastIndex := strings.LastIndex(s, ",")
	if lastIndex == -1 {
		return s
	}
	return s[:lastIndex]
}

func EncodeCursor(s string) string {
	encoded := base64.StdEncoding.EncodeToString([]byte(s))
	return encoded
}

func DecodeCursor(s string) (string, error) {
	decoded, err := base64.StdEncoding.DecodeString(s)
	if err != nil {
		return "", err
	}
	return string(decoded), nil
}

func GenerateUUID() string {
	return uuid.New().String()
}
