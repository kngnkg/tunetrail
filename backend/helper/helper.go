package helper

import "strings"

func RemoveLastComma(s string) string {
	lastIndex := strings.LastIndex(s, ",")
	if lastIndex == -1 {
		return s
	}
	return s[:lastIndex]
}
