class ApplicationController < ActionController::API
  include ActionController::Cookies

  def render_success(status = 204, opts = {})
    render(status: status, json: opts)
  end

  def render_failure(status = 400, message = "bad_request")
    render(status: status, json: { reason: message })
  end
end
