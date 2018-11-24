package handlers

func initBaseRoutes(s *srv) {
	s.Router.HandleFunc("/", s.IndexHandler).Methods("GET")
}

func initUserRoutes(s *srv) {
}
