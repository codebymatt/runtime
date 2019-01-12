module AuthHelper
  def login(user)
    Session.create(user: user) if user.session[:token].nil?
    cookies[:_runtime_session] = user.session[:token]
  end
end