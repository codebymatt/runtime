// NOTE: actual database interaction here is tested in the integrations_test folder
package db

import (
	"database/sql"
	"fmt"
	"runtime/api/models"
	"time"
)

var createUserStatement = `
	INSERT INTO users (email, first_name, last_name, password, date_joined)
	VALUES ($1, $2, $3, $4, $5)
	RETURNING id
`
var TIME_FORMAT = time.RFC3339

func CreateUser(db *sql.DB, u *models.User) error {
	formattedTime := u.DateJoined.Format(TIME_FORMAT)

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
