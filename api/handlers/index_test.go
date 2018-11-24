package handlers

import (
	"net/http"
	"net/http/httptest"
	"runtime/api/utils"
	"testing"
)

func TestIndexHandler(t *testing.T) {
	ts := srv{}
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}

	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(ts.IndexHandler)
	handler.ServeHTTP(rec, req)

	expectedBody := IndexOkMessage

	utils.CheckStatusAndContentTypeOk(t, rec)
	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
}
