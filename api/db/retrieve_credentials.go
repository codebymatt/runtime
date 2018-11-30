package db

import (
	"fmt"
	"runtime/api/models"
)

var retrieveCredentialsStatement = `SELECT email, password FROM users WHERE email=$1;`

func (store Datastore) RetrieveUserCredentials(email string) (models.User, error) {
	db := store.Db
	u := models.User{}

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

	err = tx.QueryRow(retrieveCredentialsStatement, email).Scan(&u.Email, &u.Password)

	if err != nil {
		fmt.Println(err)
		// TODO: Log error
	}

	return u, err
}
