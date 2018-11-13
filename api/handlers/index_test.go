package handlers

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestIndexHandler(t *testing.T) {
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}

	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(Index)

	handler.ServeHTTP(rec, req)

	if status := rec.Code; status != http.StatusOK {
		t.Errorf("Received wrong status code: wanted %v, got %v", http.StatusOK, status)
	}

	if contentType := rec.Header().Get("Content-Type"); contentType != "application/json" {
		t.Errorf(
			"Received wrong content type: wanted %v but got %v",
			"application/json", contentType,
		)
	}

	expectedBody := `{"Status":200,"Message":"Everything's fine!"}`
	if actualBody := rec.Body.String(); actualBody != expectedBody {
		t.Errorf("Received wrong body \nwanted: \n\t%v \ngot: \n\t%v", expectedBody, actualBody)
	}
}
