package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"runtime/api/authorization"
	"runtime/api/constants"
	"runtime/api/models"
	"strings"
	"time"
)

var IndexOkMessage = `{"Status":200,"Message":"Everything's fine!"}`
var InternalFailureMessage = `{"Status":500,"Message":"Something went wrong..."}`
var ResourceNotFoundMessage = `{"Status":404,"Message":"resource_not_found"}`
var UserNotAuthorizedMessage = `{"Status":401,"Message":"invalid_session"}`
var UnacceptedMediaTypeMessage = `{"Status":415,"Message":"invalid_content_type"}`
var BadRequestMessage = `{"Status":400,"Message":"invalid_data"}`

func (s *srv) handle404(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", constants.ApiContentType)

	message := "resource_not_found"
	responseBody, err := createJSONResponse(http.StatusNotFound, message)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, InternalFailureMessage)
		return
	}

	w.WriteHeader(http.StatusNotFound)
	fmt.Fprintf(w, responseBody)
}

func (s *srv) handleBadRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", constants.ApiContentType)

	message := "invalid_data"
	responseBody, err := createJSONResponse(http.StatusBadRequest, message)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, InternalFailureMessage)
		return
	}

	w.WriteHeader(http.StatusBadRequest)
	fmt.Fprintf(w, responseBody)
}

func (s *srv) handleUnauthorizedRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", constants.ApiContentType)

	message := "invalid_session"
	responseBody, err := createJSONResponse(http.StatusUnauthorized, message)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, InternalFailureMessage)
		return
	}

	w.WriteHeader(http.StatusUnauthorized)
	fmt.Fprintf(w, responseBody)
}

func (s *srv) handleInvalidContentType(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", constants.ApiContentType)

	message := "invalid_content_type"
	responseBody, err := createJSONResponse(http.StatusUnsupportedMediaType, message)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, InternalFailureMessage)
		return
	}

	w.WriteHeader(http.StatusUnsupportedMediaType)
	fmt.Fprintf(w, responseBody)
}

func createJSONResponse(status int, message string) (string, error) {
	body := models.JSONResponse{Status: status, Message: message}
	jsonBody, err := json.Marshal(&body)

	return string(jsonBody), err
}

func getJWTFromRequestHeader(req *http.Request) (string, error) {
	authHeader := req.Header.Get("Authorization")
	token := strings.TrimPrefix(authHeader, "Bearer ")
	if token == "" {
		return token, errors.New("No token present in header")
	}
	return token, nil
}

func generateJWT(user models.User) (string, error) {
	expiryTime := time.Now().Add(time.Hour * 24 * 7).Unix()
	return authorization.GenerateJWT(user.Email, expiryTime)
}
