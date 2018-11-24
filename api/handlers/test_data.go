package handlers

var testUserData = `{
	"first_name":"Dwight",
	"last_name":"Schrute",
	"email":"manager@schrutefarms.org",
	"password":"youllneverguessthismose"
}`

var testUserDataWithID = `{
	"id": 100000,
	"first_name":"Dwight",
	"last_name":"Schrute",
	"email":"manager@schrutefarms.org",
	"password":"youllneverguessthismose"
}`

var testUserDataWithoutPassword = `{
	"id": 100000,
	"first_name":"Dwight",
	"last_name":"Schrute",
	"email":"manager@schrutefarms.org"
}`

var testUserDataWithoutEmail = `{
	"id": 100000,
	"first_name":"Dwight",
	"last_name":"Schrute",
	"password":"youllneverguessthismose"
}`
