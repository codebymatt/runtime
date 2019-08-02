Rails.application.routes.draw do
  get "/", to: redirect("/v1/")

  namespace :v1, constraints: { format: "json" } do
    get "/", to: "indexes#healthcheck", as: :index, only: [:get]
    get "/healthcheck", to: "indexes#healthcheck", as: :healthcheck, only: [:get]

    post "/login", to: "authentication#login", as: :login, only: [:post]
    post "/logout", to: "authentication#logout", as: :logout, only: [:post]

    resource :user, only: [:show, :create, :update, :destroy]
    resources :runs, only: [:index, :show, :create, :destroy]
  end
end
