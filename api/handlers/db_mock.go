package handlers

import (
	"runtime/api/models"
)

type testDataStore struct {
}

func (store testDataStore) CreateUser(*models.User) error {
	return nil
}

var ts = srv{
	Store: testDataStore{},
}
