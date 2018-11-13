package handlers

import (
	"net/http"
	"net/http/httptest"
	"runtime/api/utils"
	"testing"
)

func TestIndexHandler(t *testing.T) {
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}

	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(IndexHandler)
	handler.ServeHTTP(rec, req)

	expectedBody := `{"Status":200,"Message":"Everything's fine!"}`

	utils.CheckStatusAndContentTypeOk(t, rec)
	utils.AssertStringsMatch(t, expectedBody, rec.Body.String())
}
