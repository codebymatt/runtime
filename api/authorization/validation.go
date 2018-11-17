package authorization

import (
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
			handlers.Handle404(w, r)
			return
		}
		// Decode JWT
		valid, _ := GetClaimsIfTokenIsValid(jwt)
		if !valid {
			// TODO: Log `invalid JWT`
			handlers.Handle404(w, r)
			return
		}
		// ctx := context.WithValue(r.Context(), "userEmail", claims.Email)
		// next.ServeHTTP(w, r.WithContext(ctx))
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
