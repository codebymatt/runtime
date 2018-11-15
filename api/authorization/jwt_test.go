package authorization

import (
	"runtime/api/utils"
	"testing"
	"time"
)

// Email: 'mgscott@dundermifflin.com'
// Expiry: time.Date(2100, 7, 4, 9, 41, 0, 0, time.UTC).Unix()
var validTestToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Im1nc2NvdHRAZHVuZGVybWlmZ" +
	"mxpbi5jb20iLCJleHAiOjQxMTgzNzcyNjB9.BuVCv859HFauWddBnyYm7N2gFx-DqkatnQI_xM-u-4o"

// ExpiresAt is Unix(0)
var invalidExpiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Im1nc2NvdHRAZHVuZGVy" +
	"bWlmZmxpbi5jb20ifQ.k4wBjS9OrIkeOL2JB91zQdYGa8Wpa4B8S53bzKE8GvY"

// Signature is invalid
var invalidSignedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Im1nc2NvdHRAZHVuZGVyb" +
	"WlmZmxpbi5jb20iLCJleHAiOjQxMTgzNzcyNjB9.wellthisgotchanged"

func TestValidJWTsAreAuthorized(t *testing.T) {
	valid, _ := GetClaimsIfTokenIsValid(validTestToken)

	if !valid {
		t.Errorf("Token should be valid, but isn't")
	}
}

func TestInvalidJWTsAreNotAuthorized(t *testing.T) {
	valid, _ := GetClaimsIfTokenIsValid(invalidSignedToken)

	if valid {
		t.Errorf("Token shouldn't be valid, but is")
	}
}

func TestExpiredJWTsAreNotAuthorized(t *testing.T) {
	valid, _ := GetClaimsIfTokenIsValid(invalidExpiredToken)

	if valid {
		t.Errorf("Token shouldn't be valid, but is")
	}
}

func TestJWTClaimsAreDecodedCorrectly(t *testing.T) {
	_, claims := GetClaimsIfTokenIsValid(validTestToken)

	expectedEmail := "mgscott@dundermifflin.com"
	expectedExpiry := time.Date(2100, 7, 4, 9, 41, 0, 0, time.UTC).Unix()

	utils.AssertStringsMatch(t, expectedEmail, claims.Email)
	if expectedExpiry != claims.ExpiresAt {
		t.Errorf("Expected expiry date to be %v, got %v", expectedExpiry, claims.ExpiresAt)
	}
}
