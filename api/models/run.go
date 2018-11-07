package models

import (
	"time"
)

type Run struct {
	UserId    int       `json:"user_id"`
	Date      time.Time `json:"date"`
	TimeTaken int       `json:"time_taken"`
	Distance  int       `json:"distance"`
}
