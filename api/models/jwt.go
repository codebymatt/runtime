package models

import (
	"os"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

var JWT_ALG = jwt.SigningMethodHS256
var JWT_SECRET = []byte(os.Getenv("RUNTIME_JWT_SECRET"))

type Claims struct {
	Email string
	jwt.StandardClaims
}

func createNewJWT(email string) (string, error) {
	claims := Claims{
		Email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		},
	}
	token := jwt.NewWithClaims(JWT_ALG, claims)
	signedToken, err := token.SignedString(JWT_SECRET)

	return signedToken, err
}

func JWTKeyFunc(*jwt.Token) (interface{}, error) {
	return JWT_SECRET, nil
}
