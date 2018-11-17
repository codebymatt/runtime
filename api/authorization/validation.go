package authorization

import (
	"context"
	"errors"
	"net/http"
	"runtime/api/handlers"
	"strings"
)

func AuthorizeRequest(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		jwt, err := getJWTFromRequestHeader(r)
		if err != nil {
			// TODO: Log `Missing JWT on authorized endpoint`
			handlers.HandleUnauthorizedRequest(w, r)
			return
		}
		// Decode JWT
		valid, claims := GetClaimsIfTokenIsValid(jwt)
		if !valid {
			// TODO: Log `invalid JWT`
			handlers.HandleUnauthorizedRequest(w, r)
			return
		}
		ctx := context.WithValue(r.Context(), "userEmail", claims.Email)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

func getJWTFromRequestHeader(req *http.Request) (string, error) {
	authHeader := req.Header.Get("Authorization")
	token := strings.TrimPrefix(authHeader, "Bearer ")
	if token == "" {
		return token, errors.New("No token present in header")
	}
	return token, nil
}
