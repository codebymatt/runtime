package handlers

import (
	"encoding/json"
	"log"
	"runtime/api/models"
)

func createJSONResponse(status int, message string) string {
	body := models.JSONResponse{Status: status, Message: message}
	jsonBody, err := json.Marshal(&body)

	if err != nil {
		// TODO: Proper logging
		log.Fatal(err)
	}
	return string(jsonBody)
}
