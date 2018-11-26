package models

import (
	"fmt"
	"runtime/api/constants"
	"strconv"
	"strings"
	"unicode/utf8"

	"golang.org/x/crypto/bcrypt"
)

var bcryptCost, _ = strconv.Atoi(constants.BcryptCost)

type User struct {
	Id         int    `json:"-"`
	Email      string `json:"email"`
	FirstName  string `json:"first_name"`
	LastName   string `json:"last_name"`
	Password   string `json:"password,omitempty"`
	DateJoined string `json:"-"`
}

type UserInfo struct {
	Email     string `json:"email"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
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
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcryptCost)
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
