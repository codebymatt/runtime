package models

import (
	"runtime/api/constants"
	"testing"
	"time"
)

var testUser = User{
	FirstName:  "Michael",
	LastName:   "Scott",
	Password:   "letspretendthispasswordisverysafeandlong",
	DateJoined: time.Now().Format(constants.TimeFormat),
}

func TestShouldNotCreateUserWithoutValidEmail(t *testing.T) {
	user := testUser

	err := user.ValidateUserData()
	if err == nil {
		t.Error("Users with blank emails should be invalid")
	}

	user.Email = "emailwithoutsymbol.com"

	err = user.ValidateUserData()
	if err == nil {
		t.Error("Users without properly formatted emails should be invalid")
	}
}

func TestShouldNotCreateUserWithoutValidPassword(t *testing.T) {
	user := testUser

	err := user.ValidateUserData()
	if err == nil {
		t.Error("Users with passwords that are blank should be invalid")
	}

	user.Password = "letspretendthispasswordisverysafeandlongletspretendthispass" +
		"wordisverysafeandlongletspretendthispasswordisverysafeandlo" +
		"ngletspretendthispasswordisverysafeandlongletspretendthispa" +
		"sswordisverysafeandlong"

	err = user.ValidateUserData()
	if err == nil {
		t.Error("Users with passwords that are too long should be invalid")
	}
}

func TestPasswordShouldBeEncrypted(t *testing.T) {
	user := testUser

	plaintextPassword := user.Password
	err := user.EncryptPassword()

	if err != nil {
		t.Errorf("Password was not properly encrypted: %v", err)
	}

	if user.Password == plaintextPassword {
		t.Error("Passwords match: encryption didn't take place")
	}

}

// func TestPasswordValidationWorksWithValidPassword(t *testing.T) {
// 	t.Fail()
// }

// func TestPasswordValidationFailsWithInvalidPassword(t *testing.T) {
// 	t.Fail()
// }
