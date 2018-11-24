package db

import (
	"database/sql"
	"fmt"
	"log"
	"runtime/api/constants"

	_ "github.com/lib/pq"
)

var connectionStringTemplate = "host=%s port=%s user=%s password=%s dbname=%s sslmode=disable"

type Datastore struct {
	Db *sql.DB
}

func InitDb() *sql.DB {
	connectionString := createConnectionString()
	db, err := sql.Open("postgres", connectionString)

	if err != nil {
		log.Panic(err)
	}
	return db
}

func createConnectionString() string {
	connString := fmt.Sprintf(
		connectionStringTemplate,
		constants.DbHost,
		constants.DbPort,
		constants.DbUser,
		constants.DbPassword,
		constants.DbName,
	)
	return connString
}
