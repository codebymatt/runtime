package authentication

import (
	"runtime/api/models"

	"golang.org/x/crypto/bcrypt"
)

func Authenticate(store models.DataAccessLayer, email, inputPassword string) (bool, error) {
	user, err := store.RetrieveUserCredentials(email)
	if err != nil {
		return false, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(inputPassword))
	if err != nil {
		// TODO: Figure out how to return false, but not handle err if password doesn't match?
		return false, nil
	}

	return true, nil
}
