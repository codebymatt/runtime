package authorization

import (
	"os"
	"runtime/api/models"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

var HMAC_SECRET = os.Getenv("RUNTIME_JWT_SECRET")

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
