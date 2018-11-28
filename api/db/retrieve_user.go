package db

import (
	"fmt"
	"runtime/api/models"
)

var retrieveUserStatement = `SELECT email, first_name, last_name FROM users WHERE email='$1';`

func (store Datastore) RetrieveUser(email string) (models.UserInfo, error) {
	db := store.Db
	u := models.UserInfo{}

	tx, err := db.Begin()
	if err != nil {
		return u, err
	}

	defer func() {
		switch err {
		case nil:
			err = tx.Commit()
		default:
			tx.Rollback()
		}
	}()

	err = tx.QueryRow(retrieveUserStatement, email).Scan(&u.Email, &u.FirstName, &u.LastName)

	if err != nil {
		fmt.Println(err)
		// TODO: Log error
	}

	return u, err
}
