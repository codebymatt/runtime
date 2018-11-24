package constants

import (
	"os"

	jwt "github.com/dgrijalva/jwt-go"
)

var JWTAlg = jwt.SigningMethodHS256
var HMACSecret = []byte(os.Getenv("RUNTIME_JWT_SECRET"))
