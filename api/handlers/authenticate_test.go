package handlers

import (
	"net/http"
	"net/http/httptest"
	"runtime/api/constants"
	"runtime/api/utils"
	"strings"
	"testing"
)

func TestShouldLoginValidUser(t *testing.T) {
	data := testLoginData
	formattedData := strings.NewReader(data)
	req, _ := http.NewRequest("POST", "/login", formattedData)

	req.Header.Set("Content-Type", constants.ApiContentType)

	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(ts.CheckContentType(ts.LoginHandler))

	handler.ServeHTTP(rec, req)
	expectedBody := `{"Status":200,"User":{"email":"mgscott@dundermifflin.com",` +
		`"first_name":"Michael","last_name":"Scott"}}`

	authHeader := rec.Header().Get("Authorization")
	if strings.TrimPrefix(authHeader, "Bearer ") == "" {
		t.Error("Expected JWT to be present")
	}

	utils.CheckStatusAndContentTypeOk(t, rec)
	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
}
