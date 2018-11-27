package models

type DataAccessLayer interface {
	CreateUser(*User) error
	RetrieveUser(string) (User, error)
}
