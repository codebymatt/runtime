Rails.application.routes.draw do
  namespace :v1 do
    resources :users, only: [:show, :create, :update, :destroy]
  end
end
