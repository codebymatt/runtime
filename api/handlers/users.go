package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"runtime/api/constants"
	"runtime/api/models"
)

func (s *srv) CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", constants.ApiContentType)
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		s.handleBadRequest(w, r)
		return
	}

	u, err := deserializeUser(body)
	if err != nil {
		s.handleBadRequest(w, r)
		return
	}

	err = s.Store.CreateUser(&u)
	if err != nil {
		s.handleBadRequest(w, r)
		return
	} else {
		// Using the UserInfo model is very important here so we don't have to worry
		// about returning password info in the response, while being able to
		// marshal JSON nicely from a struct
		userInfo := models.UserInfo{
			Email:     u.Email,
			FirstName: u.FirstName,
			LastName:  u.LastName,
		}
		responseStruct := models.UserResponse{
			Status: http.StatusOK,
			User:   userInfo,
		}

		responseBody, err := json.Marshal(responseStruct)
		if err != nil {
			s.handleBadRequest(w, r)
			return
		}

		token, err := generateJWT(u)
		if err != nil {
			s.handleBadRequest(w, r)
			return
		}

		authHeader := fmt.Sprintf("Bearer %s", token)
		w.Header().Set("Authentication", authHeader)

		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, string(responseBody))
		return
	}
}

func (s *srv) RetrieveUserHandler(w http.ResponseWriter, r *http.Request) {

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
