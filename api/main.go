package main

import (
	"fmt"
	"runtime/api/models"

	jwt "github.com/dgrijalva/jwt-go"
)

func main() {
	// r := routing.NewRouter()

	// log.Fatal(http.ListenAndServe(":8080", r))

	claims := models.Claims{
		Email: "mgscott@dundermifflin.com",
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: 0,
		},
	}
	token := jwt.NewWithClaims(models.JWT_ALG, claims)
	signedToken, _ := token.SignedString(models.JWT_SECRET)

	fmt.Println(signedToken)
}
