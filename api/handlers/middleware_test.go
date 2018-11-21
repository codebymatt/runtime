package handlers

import (
	"net/http"
	"net/http/httptest"
	"runtime/api/utils"
	"testing"
)

func TestRequestWithValidJWTIsAuthorized(t *testing.T) {
	req, _ := http.NewRequest("GET", "/", nil)

	bearer := "Bearer " + utils.ValidTestToken

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", bearer)
	rec := httptest.NewRecorder()

	handler := http.HandlerFunc(AuthorizeRequest(IndexHandler))

	handler.ServeHTTP(rec, req)

	expectedBody := IndexOkMessage

	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
	utils.CheckStatusAndContentTypeOk(t, rec)
}

func TestRequestWithInvalidJWTIsUnauthorized(t *testing.T) {
	req, _ := http.NewRequest("GET", "/", nil)

	bearer := "Bearer " + utils.InvalidExpiredToken

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", bearer)
	rec := httptest.NewRecorder()

	handler := http.HandlerFunc(AuthorizeRequest(IndexHandler))
	handler.ServeHTTP(rec, req)

	expectedBody := UserNotAuthorizedMessage
	expectedHeader := http.StatusUnauthorized

	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
	if rec.Code != expectedHeader {
		t.Errorf("Expected status %v, got %v instead", expectedHeader, rec.Code)
	}
}

func TestRequestWithValidContentTypeShouldBeAllowed(t *testing.T) {
	req, _ := http.NewRequest("GET", "/", nil)

	bearer := "Bearer " + utils.ValidTestToken

	req.Header.Set("Content-Type", API_CONTENT_TYPE)
	req.Header.Set("Authorization", bearer)
	rec := httptest.NewRecorder()

	handler := http.HandlerFunc(CheckContentType(AuthorizeRequest(IndexHandler)))

	handler.ServeHTTP(rec, req)

	expectedBody := IndexOkMessage

	if rec.Code != http.StatusOK {
		t.Errorf(
			"Expected response status to be %d, got %d instead",
			http.StatusOK,
			rec.Code,
		)
	}

	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
}

func TestRequestWithInvalidContentTypeShouldBeRejected(t *testing.T) {
	req, _ := http.NewRequest("GET", "/", nil)

	bearer := "Bearer " + utils.ValidTestToken

	req.Header.Set("Content-Type", "text/html")
	req.Header.Set("Authorization", bearer)
	rec := httptest.NewRecorder()

	indexHandler := http.HandlerFunc(IndexHandler)
	handler := http.HandlerFunc(CheckContentType(AuthorizeRequest(indexHandler)))

	handler.ServeHTTP(rec, req)

	expectedBody := UnacceptedMediaTypeMessage

	if rec.Code != 415 {
		t.Errorf(
			"Expected response status to be %d, got %d instead",
			http.StatusUnsupportedMediaType,
			rec.Code,
		)
	}

	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
}
