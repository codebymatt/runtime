package handlers

import (
	"runtime/api/server"

	"github.com/gorilla/mux"
)

func InitRouter() *mux.Router {
	return mux.NewRouter().StrictSlash(true)
}

func InitRoutes(s *server.Server) {
	handlerServer := srv(*s)
	server := &handlerServer

	initBaseRoutes(server)
	initUserRoutes(server)
}
