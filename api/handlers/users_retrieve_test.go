package handlers

import (
	"net/http"
	"net/http/httptest"
	"runtime/api/constants"
	"runtime/api/utils"
	"strings"
	"testing"
)

func TestShouldRetrieveUser(t *testing.T) {
	req, _ := http.NewRequest("GET", "/users", nil)
	bearerToken := "Bearer " + constants.ValidTestToken

	req.Header.Set("Content-Type", constants.ApiContentType)
	req.Header.Set("Authentication", bearerToken)

	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(ts.CheckContentType(ts.AuthorizeRequest(ts.RetrieveUserHandler)))

	handler.ServeHTTP(rec, req)
	expectedBody := `{"Status":200,"User":{"email":"mgscott@dundermifflin.com",` +
		`"first_name":"Michael","last_name":"Scott"}}`

	authHeader := rec.Header().Get("Authentication")
	if strings.TrimPrefix(authHeader, "Bearer ") == "" {
		t.Error("Expected JWT to be present")
	}

	utils.CheckStatusAndContentTypeOk(t, rec)
	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
}

func TestShouldNotRetrieveUserWithExpiredJWT(t *testing.T) {
	req, _ := http.NewRequest("GET", "/users", nil)
	bearerToken := "Bearer " + constants.InvalidExpiredToken

	req.Header.Set("Content-Type", constants.ApiContentType)
	req.Header.Set("Authentication", bearerToken)

	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(ts.CheckContentType(ts.AuthorizeRequest(ts.RetrieveUserHandler)))

	handler.ServeHTTP(rec, req)
	expectedBody := `{"Status":401,"Message":"invalid_session"}`

	authHeader := rec.Header().Get("Authentication")
	if strings.TrimPrefix(authHeader, "Bearer ") != "" {
		t.Error("Did not expect JWT to be present")
	}

	utils.CheckContentTypeOk(t, rec)
	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
}

func TestShouldNotRetrieveUserWithInvalidJWT(t *testing.T) {
	req, _ := http.NewRequest("GET", "/users", nil)
	bearerToken := "Bearer " + constants.InvalidSignedToken

	req.Header.Set("Content-Type", constants.ApiContentType)
	req.Header.Set("Authentication", bearerToken)

	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(ts.CheckContentType(ts.AuthorizeRequest(ts.RetrieveUserHandler)))

	handler.ServeHTTP(rec, req)
	expectedBody := `{"Status":401,"Message":"invalid_session"}`

	authHeader := rec.Header().Get("Authentication")
	if strings.TrimPrefix(authHeader, "Bearer ") != "" {
		t.Error("Did not expect JWT to be present")
	}

	utils.CheckContentTypeOk(t, rec)
	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
}
