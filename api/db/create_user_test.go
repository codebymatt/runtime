package db

import (
	"runtime/api/constants"
	"runtime/api/models"
	"testing"
	"time"

	sqlmock "gopkg.in/DATA-DOG/go-sqlmock.v1"
)

func TestShouldCreateUser(t *testing.T) {
	db, mock, err := sqlmock.New()
	store := Datastore{
		Db: db,
	}

	if err != nil {
		t.Fatalf("An error '%s' was not expected when opening a stub database connection", err)
	}
	defer db.Close()

	columns := []string{"id"}
	mock.ExpectBegin()
	mock.ExpectQuery("^INSERT INTO users (.+) VALUES (.+) RETURNING id$").
		WillReturnRows(sqlmock.NewRows(columns).AddRow(1))
	mock.ExpectCommit()

	user := models.User{
		Email:      "mgscott@dundermifflin.com",
		FirstName:  "Michael",
		LastName:   "Scott",
		Password:   "letspretendthispasswordisverysafeandlong",
		DateJoined: time.Now().Format(constants.TimeFormat),
	}

	err = store.CreateUser(&user)
	if err != nil {
		t.Errorf("User could not be created: %v", err)
	}

	if err = mock.ExpectationsWereMet(); err != nil {
		t.Errorf("There were unfulfilled expectations: %s", err)
	}
}
