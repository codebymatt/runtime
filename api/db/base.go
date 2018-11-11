package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

var Db *sql.DB

type Config struct {
	HOST     string
	PORT     string
	USER     string
	PASSWORD string
	DBNAME   string
}

func GetDBConfig() string {
	cfg := createConfigFromEnvironment()

	cfgString := fmt.Sprintf(
		"user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		cfg.USER, cfg.PASSWORD, cfg.DBNAME, cfg.HOST, cfg.PORT)

	return cfgString
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

// type PgDB struct {
// 	Db  *sql.DB
// 	cfg Config
// }

// func New(cfg Config) (PgDB, error) {
// 	db, err := sql.Open("postgres", fmt.Sprintf(
// 		"user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
// 		cfg.USER, cfg.PASSWORD, cfg.DBNAME, cfg.HOST, cfg.PORT))

// 	if err != nil {
// 		// TODO: LOG ERRORS
// 		return db, err
// 	}

// 	if err = db.Ping(); err != nil {

// 	}
// }
