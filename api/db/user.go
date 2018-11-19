// NOTE: actual database interaction here is tested in the integrations_test folder
package db

import (
	"runtime/api/models"
	"time"
)

var createUserStatement = `
	INSERT INTO users (email, first_name, last_name, password, date_joined)
	VALUES($1, $2, $3, $4, $5)
	RETURNING id
`
var TIME_FORMAT = time.RFC3339

func (db *dbStore) CreateUser(u *models.User) error {
	formattedTime := u.DateJoined.Format(TIME_FORMAT)
	err := dbStore.db.QueryRow(
		createUserStatement,
		u.Email,
		u.FirstName,
		u.LastName,
		u.Password,
		formattedTime,
	).
		Scan(&u.Id)

	if err != nil {
		panic(err)
	}

	return err
}
