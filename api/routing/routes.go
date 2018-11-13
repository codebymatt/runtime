package routing

import (
	"net/http"
	"runtime/api/handlers"
)

type Route struct {
	Method  string
	Path    string
	Name    string
	Handler http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	{
		"GET",
		"/",
		"Index",
		handlers.Index,
	},
}
