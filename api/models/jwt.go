package models

import (
	jwt "github.com/dgrijalva/jwt-go"
)

type Claim struct {
	email string
	jwt.StandardClaims
}
