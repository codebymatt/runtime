module V1
  class UsersController < ApplicationController
    def create
      user_data = new_user_params
      User.create(user_data)
    end

    private

    def new_user_params
      # byebug
      params.require(:user).permit(:email, :password, :first_name, :last_name)
    end
  end
end