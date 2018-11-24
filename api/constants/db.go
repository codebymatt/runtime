package constants

import (
	"os"
	"time"
)

var TimeFormat = time.RFC3339
var BcryptCost = os.Getenv("RUNTIME_BCRYPT_COST")
var DbHost = os.Getenv("RUNTIME_DB_HOST")
var DbPort = os.Getenv("RUNTIME_DB_PORT")
var DbUser = os.Getenv("RUNTIME_DB_USER")
var DbPassword = os.Getenv("RUNTIME_DB_PASSWORD")
var DbName = os.Getenv("RUNTIME_DB_NAME")
