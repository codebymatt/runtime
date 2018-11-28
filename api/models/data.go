package models

type DataAccessLayer interface {
	CreateUser(*User) error
	RetrieveUser(string) (UserInfo, error)
}
