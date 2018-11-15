package handlers

import (
	"encoding/json"
	"runtime/api/models"
)

var InternalFailureMessage = `{"Status":500,"Message":"Something went wrong..."}`
var ResourceNotFoundMessage = `{"Status":404,"Message":"Resource not found."}`

func createJSONResponse(status int, message string) (string, error) {
	body := models.JSONResponse{Status: status, Message: message}
	jsonBody, err := json.Marshal(&body)

	return string(jsonBody), err
}
