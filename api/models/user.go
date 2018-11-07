package models

import "time"

type User struct {
	Id         int    `json:"id"`
	Email      string `json:"email"`
	FirstName  string `json:"first_name"`
	LastName   string `json:"last_name"`
	Password   string
	DateJoined time.Time `json:"date_joined"`
}

type Users []User
