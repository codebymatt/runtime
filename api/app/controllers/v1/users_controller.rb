module V1
  class UsersController < ApplicationController
    before_action :check_authorization, except: [:create]

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
        render_success(200, user: safely_serialized_user)
      else
        render_json_404
      end
    end

    def update
      return render_failure(400, "Can't update password through API") if params_has_password_data?
      return render_failure(400, "Email can't be nil") if update_user_params[:email].nil?
      current_user.update!(update_user_params)
      render_success(200, user: safely_serialized_user)
    end

    private

    def new_user_params
      params.require(:user).permit(:email, :password, :first_name, :last_name)
    end

    def safely_serialized_user
      current_user.as_json(only: [:email, :first_name, :last_name])
    end

    def update_user_params
      params.require(:user).permit(:email, :password, :first_name, :last_name)
    end

    def params_has_password_data?
      params[:user].present? &&
        params[:user].key?(:password) ||
        params[:user].key?(:password_digest)
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