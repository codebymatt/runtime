package db

import (
	"testing"
	"time"

	sqlmock "gopkg.in/DATA-DOG/go-sqlmock.v1"
)

func TestShouldCreateUser(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("An error '%s' was not expected when pening a stub database connection", err)
	}
	defer db.Close()

	mock.ExpectBegin()
	mock.ExpectExec("^INSERT INTO users (.+) VALUES (.+) RETURNING id$").
		WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()

	user := User{
		Email:      "mgscott@dundermifflin.com",
		FirstName:  "Michael",
		LastName:   "Scott",
		Password:   "letspretendthispasswordisverysafeandlong",
		DateJoined: time.Now(),
	}

	id, err := CreateUser(user)
	if err != nil || id != 1 {
		t.Errorf("User could not be created: %s", err)
	}

	if err = mock.ExpectationsWereMet(); err != nil {
		t.Errorf("There were unfulfilled expectations: %s", err)
	}
}
