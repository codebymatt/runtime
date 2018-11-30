package authentication

import (
	"fmt"
	"runtime/api/constants"
	"runtime/api/models"
	"runtime/api/server"
	"strconv"

	"golang.org/x/crypto/bcrypt"
)

type srv server.Server

type testDataStore struct {
}

var ts = srv{
	Store: testDataStore{},
}

func (store testDataStore) RetrieveUserCredentials(email string) (models.User, error) {
	bcryptCost, _ := strconv.Atoi(constants.BcryptCost)
	fakePassword := "worldsbestboss"

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(fakePassword), bcryptCost)
	hashedString := string(hashedPassword)
	fmt.Println(hashedString)

	user := models.User{
		Email:    "mgscott@dundermifflin.com",
		Password: hashedString,
	}

	return user, nil
}

func (store testDataStore) CreateUser(u *models.User) error {
	return nil
}

func (store testDataStore) RetrieveUser(email string) (models.UserInfo, error) {
	return models.UserInfo{}, nil
}
