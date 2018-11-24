// NOTE: actual database interaction here is tested in the integrations_test folder
package db

import (
	"fmt"
	"runtime/api/constants"
	"runtime/api/models"
)

var createUserStatement = `
	INSERT INTO users (email, first_name, last_name, password, date_joined)
	VALUES ($1, $2, $3, $4, $5)
	RETURNING id
`

func (store Datastore) CreateUser(u *models.User) error {
	db := store.Db
	formattedTime := u.DateJoined.Format(constants.TimeFormat)
	err := u.ValidateUserData()
	if err != nil {
		return fmt.Errorf("User data was invalid")
	}

	err = u.EncryptPassword()
	if err != nil {
		return fmt.Errorf("User password could not be encrypted")
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
