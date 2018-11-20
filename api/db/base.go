package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB
var BCRYPT_SECRET = os.Getenv("RUNTIME_BCRYPT_SECRET")
var BCRYPT_COST = os.Getenv("RUNTIME_BCRYPT_COST")
var connectionStringTemplate = "user=%s password=%s dbname=%s host=%s port=%s sslmode=disable"

type Config struct {
	HOST     string
	PORT     string
	USER     string
	PASSWORD string
	DBNAME   string
}

func createConfigFromEnvironment() Config {
	return Config{
		HOST:     os.Getenv("RUNTIME_DB_HOST"),
		PORT:     os.Getenv("RUNTIME_DB_PORT"),
		USER:     os.Getenv("RUNTIME_DB_USER"),
		PASSWORD: os.Getenv("RUNTIME_DB_PASSWORD"),
		DBNAME:   os.Getenv("RUNTIME_DB_DBNAME"),
	}
}

func CreateConnectionString() string {
	cfg := createConfigFromEnvironment()
	connString := fmt.Sprintf(
		connectionStringTemplate,
		cfg.USER,
		cfg.PASSWORD,
		cfg.DBNAME,
		cfg.HOST,
		cfg.PORT,
	)
	return connString
}
