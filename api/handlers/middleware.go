package handlers

import (
	"context"
	"net/http"
	"runtime/api/authorization"
)

func AuthorizeRequest(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		jwt, err := getJWTFromRequestHeader(r)
		if err != nil {
			// TODO: Log `Missing JWT on authorized endpoint`
			handleUnauthorizedRequest(w, r)
			return
		}
		// Decode JWT
		valid, claims := authorization.GetClaimsIfTokenIsValid(jwt)
		if !valid {
			// TODO: Log `invalid JWT`
			handleUnauthorizedRequest(w, r)
			return
		}
		ctx := context.WithValue(r.Context(), "userEmail", claims.Email)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

func CheckContentType(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		contentType := r.Header.Get("Content-Type")
		if contentType != API_CONTENT_TYPE {
			handleInvalidContentType(w, r)
			return
		}
		next.ServeHTTP(w, r)
	}
}
