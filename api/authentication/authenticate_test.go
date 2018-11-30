package authentication

import (
	"testing"
)

func TestShouldAuthenticateValidUser(t *testing.T) {
	email := "mgscott@dundermifflin.com"
	password := "worldsbestboss"

	valid, err := Authenticate(ts.Store, email, password)
	if err != nil {
		t.Errorf("Error while authenticating user: %v", err)
	}

	if !valid {
		t.Error("User should be valid!")
	}
}

func TestShouldNotAuthenticateInvalidUser(t *testing.T) {
	email := "mgscott@dundermifflin.com"
	password := "worldsworstboss"

	valid, err := Authenticate(ts.Store, email, password)
	if err == nil {
		t.Errorf("Error while authenticating user: %v", err)
	}

	if valid {
		t.Error("User should NOT be valid!")
	}
}
