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
	valid, _ := GetClaimsIfTokenIsValid(token)

	if !valid {
		t.Errorf("Token should be valid, but isn't")
	}
}

func TestInvalidJWTsAreNotAuthorized(t *testing.T) {
	// Signature is invalid
	invalidToken := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Im1nc2NvdHRAZHVuZGVyb" +
		"WlmZmxpbi5jb20iLCJleHAiOjQxMTgzNzcyNjB9.wellthisgotchanged"

	valid, _ := GetClaimsIfTokenIsValid(invalidToken)

	if valid {
		t.Errorf("Token shouldn't be valid, but is")
	}
}

func TestExpiredJWTsAreNotAuthorized(t *testing.T) {
	// ExpiresAt is Unix(0)
	invalidToken := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Im1nc2NvdHRAZHVuZGVyb" +
		"WlmZmxpbi5jb20ifQ.k4wBjS9OrIkeOL2JB91zQdYGa8Wpa4B8S53bzKE8GvY"

	valid, _ := GetClaimsIfTokenIsValid(invalidToken)

	if valid {
		t.Errorf("Token shouldn't be valid, but is")
	}
}

func TestJWTClaimsAreDecodedCorrectly(t *testing.T) {
	_, claims := GetClaimsIfTokenIsValid(token)

	expectedEmail := "mgscott@dundermifflin.com"
	expectedExpiry := time.Date(2100, 7, 4, 9, 41, 0, 0, time.UTC).Unix()

	utils.AssertStringsMatch(t, expectedEmail, claims.Email)
	if expectedExpiry != claims.ExpiresAt {
		t.Errorf("Expected expiry date to be %v, got %v", expectedExpiry, claims.ExpiresAt)
	}
}
