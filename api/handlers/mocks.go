package handlers

import (
	"errors"
	"fmt"
	"runtime/api/constants"
	"runtime/api/models"
	"strconv"

	"golang.org/x/crypto/bcrypt"
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

func (store testDataStore) RetrieveUserCredentials(string) (models.User, error) {
	bcryptCost, _ := strconv.Atoi(constants.BcryptCost)
	fakePassword := "worldsbestboss"

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(fakePassword), bcryptCost)
	hashedString := string(hashedPassword)

	user := models.User{
		Email:    "mgscott@dundermifflin.com",
		Password: hashedString,
	}

	return user, nil
}
