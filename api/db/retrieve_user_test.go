package db

import (
	"testing"

	sqlmock "gopkg.in/DATA-DOG/go-sqlmock.v1"
)

func TestShouldRetrieveUser(t *testing.T) {
	db, mock, err := sqlmock.New()
	store := Datastore{
		Db: db,
	}

	if err != nil {
		t.Fatalf("An error '%s' was not expected when opening a stub database connection", err)
	}
	defer db.Close()

	columns := []string{"email", "first_name", "last_name"}
	rows := sqlmock.NewRows(columns).AddRow("mgscott@dundermifflin.com", "Mike", "Scott")

	mock.ExpectBegin()
	mock.ExpectQuery("^SELECT email, first_name, last_name FROM users WHERE email=.+$").
		WillReturnRows(rows)
	mock.ExpectCommit()

	email := "mgscott@dundermifflin.com"

	_, err = store.RetrieveUser(email)
	if err != nil {
		t.Errorf("User could not be created: %v", err)
	}

	if err = mock.ExpectationsWereMet(); err != nil {
		t.Errorf("There were unfulfilled expectations: %s", err)
	}
}
