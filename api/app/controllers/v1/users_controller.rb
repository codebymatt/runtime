module V1
  class UsersController < ApplicationController
    before_action :check_authorization, only: [:show]
    def create
      @user = User.new(new_user_params)
      if @user.save
        set_secure_session_cookie
        render_success(200, user: @user.as_json(only: [:email, :first_name, :last_name]))
      else
        render_failure(400, "user_not_created")
      end
    end

    def show
      if current_user.present?
        render_success(200, user: current_user.as_json(only: [:email, :first_name, :last_name]))
      else
        render_json_404
      end
    end

    private

    def new_user_params
      params.require(:user).permit(:email, :password, :first_name, :last_name)
    end

    def set_secure_session_cookie
      cookies[:_runtime_session] = {
        value: @user.session.token,
        httponly: true,
        expires: Time.now + 7.days
      }
    end
  end
end