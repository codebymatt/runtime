package handlers

import "testing"

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

func TestRequestWithValidJWTIsAuthorized(t *testing.T) {
	t.Fail()
}

func TestRequestWithInvalidJWTIsUnauthorized(t *testing.T) {
	t.Fail()
}
