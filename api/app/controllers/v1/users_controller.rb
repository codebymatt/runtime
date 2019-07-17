module V1
  class UsersController < ApplicationController
    before_action :check_authorization, except: [:create]

    def create
      @user = User.create(new_user_params)
      if @user.valid?
        set_secure_session_cookie
        render_success(200, user: @user.as_json(only: [:email, :name]))
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
      return render_failure(400, "no_password_update_allowed") if params_has_password_data?
      current_user.update!(update_user_params)
      render_success(200, user: safely_serialized_user)
    end

    def destroy
      if current_user.destroy
        cookies.delete(:_runtime_session)
        return render_success(200, message: "user_destroyed")
      end
      render_failure(400, "user_not_destroyed")
    end

    private

    def new_user_params
      params.require(:user)
            .permit(:email, :password, :password_confirmation, :name)
    end

    def safely_serialized_user
      current_user.as_json(only: [:email, :name])
    end

    def update_user_params
      params.require(:user).permit(:email, :password, :name)
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