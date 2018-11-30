package db

import (
	"testing"

	sqlmock "gopkg.in/DATA-DOG/go-sqlmock.v1"
)

func TestShouldRetrieveUserCredentials(t *testing.T) {
	db, mock, err := sqlmock.New()
	store := Datastore{
		Db: db,
	}

	if err != nil {
		t.Fatalf("An error '%s' was not expected when opening a stub database connection", err)
	}
	defer db.Close()

	columns := []string{"email", "password"}
	rows := sqlmock.NewRows(columns).AddRow("mgscott@dundermifflin.com", "abcdefghijklmnop")

	mock.ExpectBegin()
	mock.ExpectQuery("^SELECT email, password FROM users WHERE email=.+$").
		WillReturnRows(rows)
	mock.ExpectCommit()

	email := "mgscott@dundermifflin.com"

	_, err = store.RetrieveUserCredentials(email)
	if err != nil {
		t.Errorf("Credentials could not be retrieved: %v", err)
	}

	if err = mock.ExpectationsWereMet(); err != nil {
		t.Errorf("There were unfulfilled expectations: %s", err)
	}
}
