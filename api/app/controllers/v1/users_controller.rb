module V1
  class UsersController < ApplicationController
    def create
      @user = User.new(new_user_params)
      if @user.save
        render(status: :ok, json: { user: @user.as_json(only: [:email, :first_name, :last_name]) })
      else
        render(status: 400, json: { message: "User could not be created" })
      end
    end

    private

    def new_user_params
      params.require(:user).permit(:email, :password, :first_name, :last_name)
    end
  end
end