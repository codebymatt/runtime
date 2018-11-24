package models

type DataAccessLayer interface {
	CreateUser(*User) error
}
