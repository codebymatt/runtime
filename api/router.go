package main

import "github.com/gorilla/mux"

func initRouter() *mux.Router {
	return mux.NewRouter().StrictSlash(true)
}
