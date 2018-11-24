package models

import (
	"runtime/api/constants"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

type Claims struct {
	Email string
	jwt.StandardClaims
}

func createNewJWT(email string) (string, error) {
	claims := Claims{
		Email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24 * 7).Unix(),
		},
	}
	token := jwt.NewWithClaims(constants.JWTAlg, claims)
	signedToken, err := token.SignedString(constants.HMACSecret)

	return signedToken, err
}

func JWTKeyFunc(*jwt.Token) (interface{}, error) {
	return constants.HMACSecret, nil
}
