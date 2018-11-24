package handlers

import (
	"fmt"
	"net/http"
)

func (s *srv) IndexHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", API_CONTENT_TYPE)

	message := "Everything's fine!"
	responseBody, err := createJSONResponse(http.StatusOK, message)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, InternalFailureMessage)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, responseBody)
}
