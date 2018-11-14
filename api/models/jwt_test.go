package models

import (
	"fmt"
	"runtime/api/utils"
	"testing"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

func TestValidClaimIsValidated(t *testing.T) {
	claim := Claims{
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

func TestInvalidClaimIsInvalidated(t *testing.T) {
	claim := Claims{
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
	token := JWTToken(
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Im1nc2NvdHRAZHVuZGVybWlmZmxp" +
			"bi5jb20iLCJleHAiOjQxMTgzNzcyNjB9.BuVCv859HFauWddBnyYm7N2gFx-DqkatnQI_xM-u-4o",
	)
	decoded, err := token.Decode()
	if err != nil {
		t.Errorf("Received error while parsing token: %v", err)
	}

	decodedExpiry := decoded.ExpiresAt
	decodedEmail := decoded.Email

	expectedEmail := "mgscott@dundermifflin.com"
	expectedExpiry := time.Date(2100, 7, 4, 9, 41, 0, 0, time.UTC).Unix()

	utils.AssertStringsMatch(t, expectedEmail, decodedEmail)
	if decodedExpiry != expectedExpiry {
		t.Errorf("Expected expiry time to be before %v, got %v instead", expectedExpiry, decodedExpiry)
	}
}

func TestJWTIsEncodedProperly(t *testing.T) {
	email := "mgscott@dundermifflin.com"
	token := createNewJWT(email)

	decoded, err := token.Decode()
	if err != nil {
		t.Errorf("Received error while parsing token: %v", err)
	}

	decodedTime := decoded.ExpiresAt
	validTime := time.Now().UTC().Unix()

	utils.AssertStringsMatch(t, decoded.Email, email)
	// Panic when both times used
	fmt.Printf("%d", decodedTime)
	fmt.Printf("%d", validTime)
	// if decodedTime < validTime {
	// 	// 	t.Errorf("Expected expiry time to be before %v, got %v instead", validTime, decodedTime)
	// }
}

func TestReturnUserForAGivenJWT(t *testing.T) {
	// Generate/declare JWT
	// Get claim
	// Retrieve models from email
}
