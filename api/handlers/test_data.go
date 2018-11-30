package handlers

var testUserData = `{
	"first_name":"Michael",
	"last_name":"Scott",
	"email":"mgscott@dundermifflin.com",
	"password":"worldsbestboss"
}`

var testLoginData = `{
	"email":"mgscott@dundermifflin.com",
	"password":"worldsbestboss"
}`

var badLoginData = `{
	"email":"mgscott@dundermifflin.com",
	"password":"idoneguesseditMichael"
}`

var testUserDataWithID = `{
	"id": 100000,
	"first_name":"Michael",
	"last_name":"Scott",
	"email":"mgscott@dundermifflin.com",
	"password":"worldsbestboss"
}`

var testUserDataWithoutPassword = `{
	"id": 100000,
	"first_name":"Michael",
	"last_name":"Scott",
	"email":"mgscott@dundermifflin.com"
}`

var testUserDataWithoutEmail = `{
	"id": 100000,
	"first_name":"Michael",
	"last_name":"Scott",
	"password":"worldsbestboss"
}`
