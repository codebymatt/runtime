package handlers

import (
	"fmt"
	"net/http"
)

func Index(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")

	message := "Everything's fine!"
	responseBody := createJSONResponse(http.StatusOK, message)

	fmt.Fprintf(w, responseBody)
}
