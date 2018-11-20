// NOTE: actual database interaction here is tested in the integrations_test folder
package db

import (
	"database/sql"
	"fmt"
	"runtime/api/models"
	"strings"
	"time"
	"unicode/utf8"
)

var createUserStatement = `
	INSERT INTO users (email, first_name, last_name, password, date_joined)
	VALUES ($1, $2, $3, $4, $5)
	RETURNING id
`
var TIME_FORMAT = time.RFC3339

func CreateUser(db *sql.DB, u *models.User) error {
	formattedTime := u.DateJoined.Format(TIME_FORMAT)
	err := validateUserData(*u)
	if err != nil {
		return fmt.Errorf("User data was invalid")
	}

	tx, err := db.Begin()
	if err != nil {
		return err
	}

	defer func() {
		switch err {
		case nil:
			err = tx.Commit()
		default:
			tx.Rollback()
		}
	}()

	err = tx.QueryRow(
		createUserStatement,
		u.Email,
		u.FirstName,
		u.LastName,
		u.Password,
		formattedTime,
	).
		Scan(&u.Id)

	if err != nil {
		fmt.Println(err)
		// TODO: Log error
	}
	return err
}

func validateUserData(u models.User) error {
	if !validEmail(u.Email) {
		return fmt.Errorf("Invalid email")
	}

	if !validPassword(u.Password) {
		return fmt.Errorf("Invalid password")
	}
	return nil
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
