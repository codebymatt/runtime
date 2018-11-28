package handlers

import (
	"errors"
	"fmt"
	"runtime/api/models"
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

func (store testDataStore) RetrieveUser(email string) (models.UserInfo, error) {
	if email == "" {
		err := errors.New("Could not retrieve user")
		return models.UserInfo{}, err
	}

	user := models.UserInfo{
		Email:     email,
		FirstName: "Michael",
		LastName:  "Scott",
	}

	return user, nil
}
