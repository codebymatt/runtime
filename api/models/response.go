package models

type JSONResponse struct {
	Status  int
	Message string
}

type UserResponse struct {
	Status int
	User   UserInfo
}
