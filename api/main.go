package main

import (
	"database/sql"
	"log"
	"net/http"
	"runtime/api/db"
	"runtime/api/routing"
)

func main() {

	DB := initDb()
	defer DB.Close()

	if err := DB.Ping(); err != nil {
		log.Panic(err)
	}

	r := routing.NewRouter()

	log.Fatal(http.ListenAndServe(":8080", r))
}

func initDb() *sql.DB {
	connectionString := db.CreateConnectionString()
	DB := db.DB
	DB, err := sql.Open("postgres", connectionString)

	if err != nil {
		log.Panic(err)
	}
	return DB
}
