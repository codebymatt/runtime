package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"runtime/api/authentication"
	"runtime/api/constants"
	"runtime/api/models"
)

func (s *srv) LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", constants.ApiContentType)

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		s.handleBadRequest(w, r)
		return
	}

	user, err := deserializeUser(body)
	if err != nil {
		s.handleBadRequest(w, r)
		return
	}

	if user.Email == "" || user.Password == "" {
		s.handleBadRequest(w, r)
		return
	}

	valid, err := authentication.Authenticate(s.Store, user.Email, user.Password)
	if err != nil {
		s.handleBadRequest(w, r)
		return
	}

	if !valid {
		s.handleInvalidLogin(w, r)
		return
	}

	userInfo, err := s.Store.RetrieveUser(user.Email)
	if err != nil {
		// HANDLE SERVER ERROR HERE
		s.handleBadRequest(w, r)
		return
	}

	responseStruct := models.UserResponse{
		Status: 200,
		User:   userInfo,
	}

	responseBody, err := json.Marshal(responseStruct)
	if err != nil {
		// ALSO SERVER ERROR
		s.handleBadRequest(w, r)
		return
	}

	token, err := generateJWT(user.Email)
	if err != nil {
		s.handleBadRequest(w, r)
		return
	}

	authHeader := fmt.Sprintf("Bearer %s", token)
	w.Header().Set("Authorization", authHeader)

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, string(responseBody))
	return
}
