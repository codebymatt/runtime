package handlers

import (
	"net/http"
	"runtime/api/models"
)

func CreateUserHandler(w http.ResponseWriter, r *http.Request) {

}

func deserializeUser([]byte) (models.User, error) {
	return models.User{}, nil
}
