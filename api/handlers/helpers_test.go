package handlers

import "testing"

func TestJSONResponseIsCreated(t *testing.T) {
	status := 200
	message := "Beets, bears, Battlestar Galactica"

	expectedResponse := `{"Status":200,"Message":"Beets, bears, Battlestar Galactica"}`
	actualResponse := createJSONResponse(status, message)

	if actualResponse != expectedResponse {
		t.Errorf("Did not jsonify: expected %v but got %v", expectedResponse, actualResponse)
	}
}
