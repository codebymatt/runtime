package utils

// Email: 'mgscott@dundermifflin.com'
// Expiry: time.Date(2100, 7, 4, 9, 41, 0, 0, time.UTC).Unix()
var ValidTestToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Im1nc2NvdHRAZHVuZGVybWlmZ" +
	"mxpbi5jb20iLCJleHAiOjQxMTgzNzcyNjB9.BuVCv859HFauWddBnyYm7N2gFx-DqkatnQI_xM-u-4o"

// ExpiresAt is Unix(0)
var InvalidExpiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Im1nc2NvdHRAZHVuZGVy" +
	"bWlmZmxpbi5jb20ifQ.k4wBjS9OrIkeOL2JB91zQdYGa8Wpa4B8S53bzKE8GvY"

// Signature is invalid
var InvalidSignedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6Im1nc2NvdHRAZHVuZGVyb" +
	"WlmZmxpbi5jb20iLCJleHAiOjQxMTgzNzcyNjB9.wellthisgotchanged"
