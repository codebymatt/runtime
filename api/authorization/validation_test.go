// Testing on index for simplicity's sake, this will
// normally operate on authorized handlers. That
// use case should be covered in integration tests

package authorization

import (
	"net/http"
	"net/http/httptest"
	"runtime/api/handlers"
	"runtime/api/utils"
	"testing"
)

func TestRequestWithValidJWTIsAuthorized(t *testing.T) {
	req, _ := http.NewRequest("POST", "/users", nil)

	bearer := "Bearer " + validTestToken

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", bearer)
	rec := httptest.NewRecorder()

	indexHandler := http.HandlerFunc(handlers.IndexHandler)
	handler := http.HandlerFunc(AuthorizeRequest(indexHandler))

	handler.ServeHTTP(rec, req)

	expectedBody := handlers.IndexOkMessage

	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
	utils.CheckStatusAndContentTypeOk(t, rec)
}

func TestRequestWithValidJWTHasClaimsInRequestContext(t *testing.T) {
	t.Fail()
}

func TestRequestWithInvalidJWTIsUnauthorized(t *testing.T) {
	req, _ := http.NewRequest("POST", "/users", nil)

	bearer := "Bearer " + invalidExpiredToken

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", bearer)
	rec := httptest.NewRecorder()

	handler := http.HandlerFunc(AuthorizeRequest(handlers.IndexHandler))
	handler.ServeHTTP(rec, req)

	expectedBody := handlers.ResourceNotFoundMessage
	expectedHeader := http.StatusNotFound

	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
	if rec.Code != expectedHeader {
		t.Errorf("Expected status %v, got %v instead", expectedHeader, rec.Code)
	}
}

func TestRequestWithInvalidJWTHasNoClaimsInRequestContext(t *testing.T) {
	t.Fail()
}

func TestJWTIsRetrievedFromHeader(t *testing.T) {
	req, _ := http.NewRequest("GET", "/", nil)
	bearer := "Bearer " + validTestToken

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", bearer)

	jwt, _ := getJWTFromRequestHeader(req)

	if jwt != validTestToken {
		t.Errorf("Expected JWT to be %v, got %v instead", validTestToken, jwt)
	}
}

func TestErrorShouldBeThrownIfJWTIsEmpty(t *testing.T) {
	req, _ := http.NewRequest("GET", "/", nil)
	bearer := "Bearer "

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", bearer)

	jwt, err := getJWTFromRequestHeader(req)

	if err == nil {
		t.Errorf("Expected empty bearer token to throw err, but got %v", jwt)
	}
}
