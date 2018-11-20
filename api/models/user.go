package models

import (
	"fmt"
	"runtime/api/db"
	"strconv"
	"strings"
	"time"
	"unicode/utf8"

	"golang.org/x/crypto/bcrypt"
)

var BCRYPT_COST, _ = strconv.Atoi(db.BCRYPT_COST)

type User struct {
	Id         int    `json:"id"`
	Email      string `json:"email"`
	FirstName  string `json:"first_name"`
	LastName   string `json:"last_name"`
	Password   string
	DateJoined time.Time `json:"date_joined"`
}

type Users []User

func (u *User) ValidateUserData() error {
	if !validEmail(u.Email) {
		return fmt.Errorf("Invalid email")
	}

	if !validPassword(u.Password) {
		return fmt.Errorf("Invalid password")
	}
	return nil
}

func (u *User) EncryptPassword() error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), BCRYPT_COST)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return err
}

func validEmail(email string) bool {
	if email == "" || !strings.ContainsRune(email, '@') {
		return false
	}
	return true
}

func validPassword(password string) bool {
	if password == "" || utf8.RuneCountInString(password) > 72 {
		return false
	}
	return true
}
