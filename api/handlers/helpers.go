package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"runtime/api/models"
)

var IndexOkMessage = `{"Status":200,"Message":"Everything's fine!"}`
var InternalFailureMessage = `{"Status":500,"Message":"Something went wrong..."}`
var ResourceNotFoundMessage = `{"Status":404,"Message":"Resource not found."}`
var UserNotAuthorizedMessage = `{"Status":401,"Message":"User not authorized."}`

func createJSONResponse(status int, message string) (string, error) {
	body := models.JSONResponse{Status: status, Message: message}
	jsonBody, err := json.Marshal(&body)

	return string(jsonBody), err
}

func Handle404(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	message := "Resource not found."
	responseBody, err := createJSONResponse(http.StatusNotFound, message)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, InternalFailureMessage)
		return
	}

	w.WriteHeader(http.StatusNotFound)
	fmt.Fprintf(w, responseBody)
}

func HandleUnauthorizedRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	message := "User not authorized."
	responseBody, err := createJSONResponse(http.StatusUnauthorized, message)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, InternalFailureMessage)
		return
	}

	w.WriteHeader(http.StatusUnauthorized)
	fmt.Fprintf(w, responseBody)
}
