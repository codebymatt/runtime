package db

import (
	"runtime/api/models"
	"testing"
	"time"

	sqlmock "gopkg.in/DATA-DOG/go-sqlmock.v1"
)

func TestShouldCreateUser(t *testing.T) {
	db, mock, err := sqlmock.New()
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
		DateJoined: time.Now(),
	}

	err = CreateUser(db, &user)
	if err != nil {
		t.Errorf("User could not be created: %v", err)
	}

	if err = mock.ExpectationsWereMet(); err != nil {
		t.Errorf("There were unfulfilled expectations: %s", err)
	}
}

func TestShouldNotCreateUserWithoutValidEmail(t *testing.T) {
	user := models.User{
		FirstName:  "Michael",
		LastName:   "Scott",
		Password:   "letspretendthispasswordisverysafeandlong",
		DateJoined: time.Now(),
	}

	err := validateUserData(user)
	if err == nil {
		t.Error("Users with blank emails should be invalid")
	}

	user.Email = "emailwithoutsymbol.com"

	err = validateUserData(user)
	if err == nil {
		t.Error("Users without properly formatted emails should be invalid")
	}
}

func TestShouldNotCreateUserWithoutValidPassword(t *testing.T) {
	user := models.User{
		Email:      "mgscott@dundermifflin.com",
		FirstName:  "Michael",
		LastName:   "Scott",
		Password:   "",
		DateJoined: time.Now(),
	}

	err := validateUserData(user)
	if err == nil {
		t.Error("Users with passwords that are blank should be invalid")
	}

	user.Password = "letspretendthispasswordisverysafeandlongletspretendthispass" +
		"wordisverysafeandlongletspretendthispasswordisverysafeandlo" +
		"ngletspretendthispasswordisverysafeandlongletspretendthispa" +
		"sswordisverysafeandlong"

	err = validateUserData(user)
	if err == nil {
		t.Error("Users with passwords that are too long should be invalid")
	}
}
