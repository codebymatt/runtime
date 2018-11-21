package handlers

import (
	"net/http"
	"net/http/httptest"
	"runtime/api/utils"
	"testing"
)

func TestJSONResponseIsCreated(t *testing.T) {
	status := 200
	message := "Beets, bears, Battlestar Galactica"

	expectedResponse := `{"Status":200,"Message":"Beets, bears, Battlestar Galactica"}`
	actualResponse, err := createJSONResponse(status, message)

	if err != nil {
		t.Errorf("Could not create JSON response")
	}

	if actualResponse != expectedResponse {
		t.Errorf("Did not jsonify: expected %v but got %v", expectedResponse, actualResponse)
	}
}

func Test404MessageIsCorrect(t *testing.T) {
	expectedMessage := `{"Status":404,"Message":"resource_not_found"}`
	utils.AssertStringsMatch(t, expectedMessage, ResourceNotFoundMessage)
}

func TestUserNotAuthorizedMessageIsCorrect(t *testing.T) {
	expectedMessage := `{"Status":401,"Message":"invalid_session"}`
	utils.AssertStringsMatch(t, expectedMessage, UserNotAuthorizedMessage)
}

func TestReturn404MethodReturnsAsExpected(t *testing.T) {
	req, _ := http.NewRequest("GET", "/", nil)

	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(Handle404)
	handler.ServeHTTP(rec, req)

	expectedBody := ResourceNotFoundMessage

	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())

	if status := rec.Code; status != http.StatusNotFound {
		t.Errorf("Received wrong status code: wanted %v, got %v", http.StatusNotFound, status)
	}

	if contentType := rec.Header().Get("Content-Type"); contentType != "application/json" {
		t.Errorf(
			"Received wrong content type: wanted %v but got %v",
			"application/json", contentType,
		)
	}
}

func TestUnauthorizedRequestIsHandledCorrectly(t *testing.T) {
	req, _ := http.NewRequest("GET", "/", nil)

	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(HandleUnauthorizedRequest)
	handler.ServeHTTP(rec, req)

	expectedBody := UserNotAuthorizedMessage

	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())

	if status := rec.Code; status != http.StatusUnauthorized {
		t.Errorf("Received wrong status code: wanted %v, got %v", http.StatusUnauthorized, status)
	}

	if contentType := rec.Header().Get("Content-Type"); contentType != "application/json" {
		t.Errorf(
			"Received wrong content type: wanted %v but got %v",
			"application/json", contentType,
		)
	}
}
