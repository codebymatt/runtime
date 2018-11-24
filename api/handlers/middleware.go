package handlers

import (
	"context"
	"net/http"
	"runtime/api/authorization"
	"runtime/api/constants"
)

func (s *srv) AuthorizeRequest(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		jwt, err := getJWTFromRequestHeader(r)
		if err != nil {
			// TODO: Log `Missing JWT on authorized endpoint`
			ts.handleUnauthorizedRequest(w, r)
			return
		}
		// Decode JWT
		valid, claims := authorization.GetClaimsIfTokenIsValid(jwt)
		if !valid {
			// TODO: Log `invalid JWT`
			ts.handleUnauthorizedRequest(w, r)
			return
		}
		ctx := context.WithValue(r.Context(), "userEmail", claims.Email)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}

func (s *srv) CheckContentType(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		contentType := r.Header.Get("Content-Type")
		if contentType != constants.ApiContentType {
			ts.handleInvalidContentType(w, r)
			return
		}
		next.ServeHTTP(w, r)
	}
}
