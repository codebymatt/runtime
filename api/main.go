package main

import (
	"log"
	"net/http"
	"runtime/api/routing"
)

func main() {
	r := routing.NewRouter()

	log.Fatal(http.ListenAndServe(":8080", r))
}
