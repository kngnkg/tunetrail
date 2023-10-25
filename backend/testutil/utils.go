package testutil

import (
	"math/rand"

	"github.com/google/uuid"
)

func GenRandomUUID() string {
	return uuid.New().String()
}

func GenRamdomString(length int) string {
	charset := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[rand.Intn(len(charset))]
	}
	return string(b)
}
