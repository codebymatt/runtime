package routing

import (
	"runtime/api/handlers"
	"runtime/api/models"
)

type Route = models.Route
type Routes = models.Routes

var routes = Routes{
	{
		"GET",
		"/",
		"Index",
		handlers.IndexHandler,
	},
}
