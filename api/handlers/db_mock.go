// TODO: Move this to mocks package
package handlers

import (
	"runtime/api/models"
)

type testDataStore struct {
}

var ts = srv{
	Store: testDataStore{},
}

func (store testDataStore) CreateUser(*models.User) error {
	return nil
}
