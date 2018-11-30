package handlers

func initBaseRoutes(s *srv) {
	s.Router.HandleFunc("/", s.IndexHandler).Methods("GET")
}

func initUserRoutes(s *srv) {
	s.Router.HandleFunc("/users", s.CheckContentType(s.AuthorizeRequest(s.RetrieveUserHandler))).Methods("GET")
	s.Router.HandleFunc("/users", s.CheckContentType(s.CreateUserHandler)).Methods("POST")
	s.Router.HandleFunc("/login", s.CheckContentType(s.LoginHandler)).Methods("POST")
}
