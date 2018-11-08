package authorization

import "os"

var HMAC_SECRET = os.Getenv("RUNTIME_JWT_SECRET")
