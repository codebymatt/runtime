package authorization

import (
	"runtime/api/utils"
	"testing"
	"time"
)

// Email: 'mgscott@dundermifflin.com'
// Expiry: time.Date(2100, 7, 4, 9, 41, 0, 0, time.UTC).Unix()
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Im1nc2NvdHRAZHVuZGVybWlmZmxp" +
	"bi5jb20iLCJleHAiOjQxMTgzNzcyNjB9.BuVCv859HFauWddBnyYm7N2gFx-DqkatnQI_xM-u-4o"

func TestValidJWTsAreAuthorized(t *testing.T) {
	valid, _ := TokenIsValid(token)

	if !valid {
		t.Errorf("Token should be valid, but isn't")
	}
}

func TestInvalidJWTsAreNotAuthorized(t *testing.T) {
	t.Fail()
}

func TestJWTClaimsAreDecodedCorrectly(t *testing.T) {
	_, claims := TokenIsValid(token)

	expectedEmail := "mgscott@dundermifflin.com"
	expectedExpiry := time.Date(2100, 7, 4, 9, 41, 0, 0, time.UTC).Unix()

	utils.AssertStringsMatch(t, expectedEmail, claims.Email)
	if expectedExpiry != claims.ExpiresAt {
		t.Errorf("Expected expiry date to be %v, got %v", expectedExpiry, claims.ExpiresAt)
	}
}
