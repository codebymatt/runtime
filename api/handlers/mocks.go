package handlers

import (
	"errors"
	"fmt"
	"runtime/api/constants"
	"runtime/api/models"
	"time"
)

type testDataStore struct {
}

var ts = srv{
	Store: testDataStore{},
}

func (store testDataStore) CreateUser(u *models.User) error {
	err := u.ValidateUserData()
	if err != nil {
		return fmt.Errorf("User data was invalid")
	}

	err = u.EncryptPassword()
	if err != nil {
		return fmt.Errorf("User password could not be encrypted")
	}
	return nil
}

func (store testDataStore) RetrieveUser(email string) (models.User, error) {
	if email == "" {
		err := errors.New("Could not retrieve user")
		return models.User{}, err
	}

	user := models.User{
		Email:      email,
		FirstName:  "Michael",
		LastName:   "Scott",
		Password:   "",
		DateJoined: time.Now().Format(constants.TimeFormat),
	}

	return user, nil
}
