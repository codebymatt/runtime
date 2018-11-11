package models

import (
	"testing"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

func TestValidClaimIsValidated(t *testing.T) {
	claim := Claim{
		"mgscott@dundermifflin.com",
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Second * 10).Unix(),
		},
	}

	err := claim.Valid()

	if err != nil {
		t.Error("Claim should be valid")
	}
}

func TestInvalidClaimIsInvalid(t *testing.T) {
	claim := Claim{
		"mgscott@dundermifflin.com",
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Second * -10).Unix(),
		},
	}

	err := claim.Valid()

	if err == nil {
		t.Error("Claim should be invalid")
	}
}

func TestJWTIsDecodedProperly(t *testing.T) {

}

func TestJWTIsEncodedProperly(t *testing.T) {

}

func TestReturnUserForAGivenJWT(t *testing.T) {
	// Generate/declare JWT
	// Get claim
	// Retrieve models from email
}
