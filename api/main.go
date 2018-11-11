package main

import (
	"database/sql"
	"log"
	"runtime/api/db"
)

const SQL_DRIVER = "postgres"

func main() {
	var err error

	config := db.GetDBConfig()
	db.Db, err = sql.Open(SQL_DRIVER, config)

	if err != nil {
		log.Fatal(err)
	}
}
