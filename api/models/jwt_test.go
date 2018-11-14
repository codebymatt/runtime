package models

import (
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

func TestJWTIsEncodedProperly(t *testing.T) {
	email := "mgscott@dundermifflin.com"
	token, _ := createNewJWT(email)

	parsedToken, err := jwt.ParseWithClaims(token, &Claims{}, keyFunc)
	if err != nil {
		t.Errorf("Received error while parsing token: %v", err)
	}

	claims, ok := parsedToken.Claims.(*Claims)
	if !ok || !parsedToken.Valid {
		t.Errorf("Invalid token")
	}

	decodedTime := claims.ExpiresAt
	validTime := time.Now().Add(time.Hour).UTC().Unix()

	utils.AssertStringsMatch(t, claims.Email, email)
	if decodedTime < validTime {
		t.Errorf("Expected expiry time to be after %v, got %v instead", validTime, decodedTime)
	}
}

func TestJWTExpiresInADay(t *testing.T) {
	t.Fail()
}
