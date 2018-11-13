package utils

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func CheckStatusAndContentTypeOk(t *testing.T, rec *httptest.ResponseRecorder) {
	if status := rec.Code; status != http.StatusOK {
		t.Errorf("Received wrong status code: wanted %v, got %v", http.StatusOK, status)
	}

	if contentType := rec.Header().Get("Content-Type"); contentType != "application/json" {
		t.Errorf(
			"Received wrong content type: wanted %v but got %v",
			"application/json", contentType,
		)
	}
}

func AssertStringsMatch(t *testing.T, expected, actual string) {
	if expected != actual {
		t.Errorf("Received wrong body \nwanted: \n\t%v \ngot: \n\t%v", expected, actual)
	}
}
