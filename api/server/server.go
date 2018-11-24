package server

import (
	"runtime/api/models"

	"github.com/gorilla/mux"
)

type Server struct {
	Store  models.DataAccessLayer
	Router *mux.Router
}
