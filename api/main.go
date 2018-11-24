package main

import (
	"log"
	"net/http"
	"runtime/api/db"
	"runtime/api/handlers"
	"runtime/api/server"
)

func main() {

	Db := db.InitDb()
	defer Db.Close()

	if err := Db.Ping(); err != nil {
		log.Panic(err)
	}

	datastore := db.Datastore{
		Db: Db,
	}

	router := initRouter()

	server := server.Server{
		Store:  datastore,
		Router: router,
	}

	handlers.InitRoutes(&server)

	log.Fatal(http.ListenAndServe(":8080", server.Router))
}
