module V1
  class AuthenticationController < ApplicationController
    def login
      credentials = login_credentials
      @user = User.find_by_email(credentials["email"])
      if @user.present? && @user.authenticate(credentials["password"])
        handle_successful_user_authentication
      else
        render_failure(401, "bad_login")
      end
    end

    def logout
      if current_user
        logout_current_user
      else
        render_success(200, { message: "already_logged_out" }.as_json)
      end
    end

    private

    def login_credentials
      params.require(:credentials).permit(:email, :password)
    end

    def logout_current_user
      Session.find_by_token(cookies[:_runtime_session]).destroy!
      cookies.delete(:_runtime_session, domain: :all)
      render_success(200, { message: "successfully_logged_out" }.as_json)
    end

    def handle_successful_user_authentication
      cookies[:_runtime_session] = set_session_cookie(session_token)
      render_success(200, user: current_user.as_json(only: [:email, :first_name, :last_name]))
    end

    def session_token
      if @user.session.present? && @user.session.still_valid?
        @user.session.token
      else
        @user.session&.destroy!
        Session.create!(user: @user).token
      end
    end
  end
end