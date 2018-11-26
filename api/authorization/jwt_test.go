package authorization

import (
	"runtime/api/constants"
	"runtime/api/models"
	"runtime/api/utils"
	"testing"
	"time"
)

func TestValidJWTsAreAuthorized(t *testing.T) {
	valid, _ := GetClaimsIfTokenIsValid(constants.ValidTestToken)

	if !valid {
		t.Errorf("Token should be valid, but isn't")
	}
}

func TestInvalidJWTsAreNotAuthorized(t *testing.T) {
	valid, _ := GetClaimsIfTokenIsValid(constants.InvalidSignedToken)

	if valid {
		t.Errorf("Token shouldn't be valid, but is")
	}
}

func TestExpiredJWTsAreNotAuthorized(t *testing.T) {
	valid, _ := GetClaimsIfTokenIsValid(constants.InvalidExpiredToken)

	if valid {
		t.Errorf("Token shouldn't be valid, but is")
	}
}

func TestJWTClaimsAreDecodedCorrectly(t *testing.T) {
	_, claims := GetClaimsIfTokenIsValid(constants.ValidTestToken)

	expectedEmail := "mgscott@dundermifflin.com"
	expectedExpiry := time.Date(2100, 7, 4, 9, 41, 0, 0, time.UTC).Unix()

	utils.AssertStringsMatch(t, expectedEmail, claims.Email)
	if expectedExpiry != claims.ExpiresAt {
		t.Errorf("Expected expiry date to be %v, got %v", expectedExpiry, claims.ExpiresAt)
	}
}

func TestJWTShouldBeGeneratedProperly(t *testing.T) {
	u := models.User{Email: "mgscott@dundermifflin.com"}
	expiryTime := time.Date(2100, 7, 4, 9, 41, 0, 0, time.UTC).Unix()
	token, err := GenerateJWT(u.Email, expiryTime)

	if err != nil {
		t.Errorf("Expected token to be generated without error")
	}

	if token != constants.ValidTestToken {
		t.Errorf("Expected token to be %s, got %s instead", constants.ValidTestToken, token)
	}
}
