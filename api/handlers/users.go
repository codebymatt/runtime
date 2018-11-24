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
		// Very important that password remains blank, as password should not be passed
		// back in HTTP response. I don't like that this happens, but as long as it's
		// blank it's secure. There's a test that will catch if it's not blank, along
		// with the added bonus that it's also not the same hash that's stored in the DB
		u.Password = ""
		responseStruct := models.UserResponse{
			Status: http.StatusOK,
			User:   u,
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

func deserializeUser(b []byte) (models.User, error) {
	u := models.User{}
	err := json.Unmarshal(b, &u)
	if err != nil {
		// TODO: Log error
		return models.User{}, nil
	}

	return u, err
}
