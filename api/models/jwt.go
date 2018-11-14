package models

import (
	"os"

	jwt "github.com/dgrijalva/jwt-go"
)

var JWT_ALG = jwt.SigningMethodHS256
var JWT_SECRET = []byte(os.Getenv("RUNTIME_JWT_SECRET"))

type Claims struct {
	Email string
	jwt.StandardClaims
}

type JWTToken string

func (token JWTToken) Decode() (Claims, error) {
	tokenString := string(token)
	parsedToken, err := jwt.ParseWithClaims(tokenString, &Claims{}, keyFunc)

	if claims, ok := parsedToken.Claims.(*Claims); ok && parsedToken.Valid {
		return *claims, nil
	} else {
		return Claims{}, err
	}
}

func createNewJWT(email string) JWTToken {
	return ""
}

func keyFunc(*jwt.Token) (interface{}, error) {
	return JWT_SECRET, nil
}
