package testutil

import (
	"math/rand"
	"strconv"

	"github.com/google/uuid"
)

func GenRandomUUID() string {
	return uuid.New().String()
}

func GenRamdomString(length int) string {
	return strconv.Itoa(rand.Intn(length))
}
