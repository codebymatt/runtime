package handlers

import (
	"net/http"
	"net/http/httptest"
	"runtime/api/constants"
	"runtime/api/utils"
	"strings"
	"testing"
)

func TestShouldCreateUser(t *testing.T) {
	data := testUserData

	formattedData := strings.NewReader(data)

	req, err := http.NewRequest("POST", "/users", formattedData)
	if err != nil {
		t.Fatal(err)
	}

	req.Header.Set("Content-Type", constants.ApiContentType)
	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(ts.CreateUserHandler)

	handler.ServeHTTP(rec, req)
	expectedBody := `{"Status":200,"User":{"email":"manager@schrutefarms.org",` +
		`"first_name":"Dwight","last_name":"Schrute"}}`

	authHeader := rec.Header().Get("Authorization")
	if strings.TrimPrefix(authHeader, "Bearer ") == "" {
		t.Error("Expected JWT to be present")
	}

	utils.CheckStatusAndContentTypeOk(t, rec)
	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
}

func TestShouldNotCreateUserWithoutEmail(t *testing.T) {
	data := testUserDataWithoutPassword

	formattedData := strings.NewReader(data)

	req, err := http.NewRequest("POST", "/users", formattedData)

	if err != nil {
		t.Fatal(err)
	}

	req.Header.Set("Content-Type", constants.ApiContentType)
	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(ts.CreateUserHandler)

	handler.ServeHTTP(rec, req)

	expectedBody := `{"Status":400,"Message":"invalid_data"}`

	if rec.Code != http.StatusBadRequest {
		t.Errorf("Expected code to be %d, got %d instead", http.StatusBadRequest, rec.Code)
	}

	utils.CheckContentTypeOk(t, rec)
	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
}

func TestShouldNotCreateUserWithoutPassword(t *testing.T) {
	data := testUserDataWithoutPassword

	formattedData := strings.NewReader(data)

	req, err := http.NewRequest("POST", "/users", formattedData)

	if err != nil {
		t.Fatal(err)
	}

	req.Header.Set("Content-Type", constants.ApiContentType)
	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(ts.CreateUserHandler)

	handler.ServeHTTP(rec, req)

	expectedBody := `{"Status":400,"Message":"invalid_data"}`

	if rec.Code != http.StatusBadRequest {
		t.Errorf("Expected code to be %d, got %d instead", http.StatusBadRequest, rec.Code)
	}

	utils.CheckContentTypeOk(t, rec)
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
