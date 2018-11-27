package db

import "runtime/api/models"

func (store Datastore) RetrieveUser(email string) (models.User, error) {
	return models.User{}, nil
}
