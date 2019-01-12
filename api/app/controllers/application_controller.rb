class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :ensure_json_request, :set_json_as_response_format

  def render_success(status = 204, opts = {})
    render(status: status, json: opts)
  end

  def render_failure(status = 400, message = "bad_request")
    render(status: status, json: { reason: message })
  end

  def render_json_404
    render(status: 404, json: { reason: "resource_not_found"})
  end

  def check_authorization
    render_failure(401, "unauthorized_request") unless cookies[:_runtime_session]
  end

  def current_user
    return unless cookies[:_runtime_session]
    @current_user ||= User.with_session_token(cookies[:_runtime_session])
  end

  private

  def ensure_json_request
    return if request.format == :json
    render(status: 406, json: { reason: "Incorrect format" })
  end

  def set_json_as_response_format
    request.format = :json
  end
end
