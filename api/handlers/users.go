package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"runtime/api/models"
)

func (s *srv) CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	if err := s.Store.CreateUser(&models.User{}); err == nil {
		w.Header().Set("Content-Type", API_CONTENT_TYPE)

		message := "User successfully created!"
		responseBody, _ := createJSONResponse(http.StatusOK, message)

		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, responseBody)
		return
	}
}

func deserializeUser(b []byte) (models.User, error) {
	u := models.User{}
	err := json.Unmarshal(b, &u)
	if err != nil {
		// TODO: Log error
		return models.User{}, nil
	}

	return u, err
}
