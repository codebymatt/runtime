Rails.application.routes.draw do
  get "/", to: redirect("/v1/")

  namespace :v1, constraints: { format: "json" } do
    get "/", to: "indexes#healthcheck", as: :index, only: [:get]
    get "/healthcheck", to: "indexes#healthcheck", as: :healthcheck, only: [:get]

    post "/login", to: "authentication#login", as: :login, only: [:post]

    resources :users, only: [:show, :create, :update, :destroy]
  end
end
