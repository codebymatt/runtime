package handlers

import (
	"fmt"
	"net/http"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	message := "Everything's fine!"
	responseBody := createJSONResponse(http.StatusOK, message)

	fmt.Fprintf(w, responseBody)
}
