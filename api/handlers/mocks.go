package handlers

import (
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
