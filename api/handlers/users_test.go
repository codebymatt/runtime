package handlers

import (
	"net/http"
	"net/http/httptest"
	"runtime/api/utils"
	"strings"
	"testing"
)

var testUserData = `{
	"first_name":"Dwight,
	"last_name":"Schrute"
	"email":"manager@schrutefarms.org",
	"password":"youllneverguessthismose"
}`

var testUserDataWithID = `{
	"id": 100000,
	"first_name":"Dwight,
	"last_name":"Schrute"
	"email":"manager@schrutefarms.org",
	"password":"youllneverguessthismose"
}`

// ITODO: is this an integration/acceptance test?
func TestShouldCreateUser(t *testing.T) {
	data := testUserData

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

func TestUserJSONDataShouldBeDeserializedSuccessfully(t *testing.T) {
	data := []byte(testUserData)
	user, err := deserializeUser(data)

	if err != nil {
		t.Errorf("Unmarshalling of user failed: %v", err)
	}

	if user.Email != "manager@schrutefarms.org" {
		t.Errorf("Unmarshalling of user failed, email field is incorrect")
	}
}

func TestUserIdShouldNeverBeDeserialized(t *testing.T) {
	data := []byte(testUserDataWithID)
	user, err := deserializeUser(data)

	if err != nil {
		t.Errorf("Unmarshalling of user failed: %v", err)
	}

	if user.Id == 100000 {
		t.Errorf("Unmarshalling of user failed, id field should never be unmarshaled")
	}
}
