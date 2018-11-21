package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"runtime/api/models"
	"strings"
)

var IndexOkMessage = `{"Status":200,"Message":"Everything's fine!"}`
var InternalFailureMessage = `{"Status":500,"Message":"Something went wrong..."}`
var ResourceNotFoundMessage = `{"Status":404,"Message":"resource_not_found"}`
var UserNotAuthorizedMessage = `{"Status":401,"Message":"invalid_session"}`
var UnacceptedMediaTypeMessage = `{"Status":415,"Message":"invalid_content_type"}`

var API_CONTENT_TYPE = "application/json"

func handle404(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", API_CONTENT_TYPE)

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

func handleUnauthorizedRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", API_CONTENT_TYPE)

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

func handleInvalidContentType(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", API_CONTENT_TYPE)

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
