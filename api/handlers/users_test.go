package handlers

import (
	"net/http"
	"net/http/httptest"
	"runtime/api/utils"
	"strings"
	"testing"
)

func TestShouldCreateUser(t *testing.T) {
	data := `{
			"user": {
				"first_name":"Dwight,
				"last_name":"Schrute"
				"email":"manager@schrutefarms.org",
				"password":"youllneverguessthismose"
			}
		}`

	formattedData := strings.NewReader(data)

	req, err := http.NewRequest("POST", "/users", formattedData)
	if err != nil {
		t.Fatal(err)
	}

	req.Header.Set("Content-Type", API_CONTENT_TYPE)
	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(CreateUserHandler)

	handler.ServeHTTP(rec, req)

	expectedBody := `{
		"Status":200,
		"Message":"User successfully created!"
	}`

	utils.CheckStatusAndContentTypeOk(t, rec)
	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
}
