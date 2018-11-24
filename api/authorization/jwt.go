package authorization

import (
	"runtime/api/constants"
	"runtime/api/models"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

func GetClaimsIfTokenIsValid(token string) (bool, models.Claims) {
	parsedToken, err := jwt.ParseWithClaims(token, &models.Claims{}, models.JWTKeyFunc)
	if err != nil {
		return false, models.Claims{}
	}

	claims, ok := parsedToken.Claims.(*models.Claims)
	if !ok || !parsedToken.Valid {
		return false, models.Claims{}
	}

	if claims.ExpiresAt < time.Now().Unix() {
		return false, models.Claims{}
	}

	return ok, *claims
}

func GenerateJWT(email string, expiry int64) (string, error) {
	jwtSecret := []byte(constants.HMACSecret)

	claims := models.Claims{
		Email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expiry,
		},
	}

	token := jwt.NewWithClaims(constants.JWTAlg, claims)
	tokenString, err := token.SignedString(jwtSecret)
	return tokenString, err
}
