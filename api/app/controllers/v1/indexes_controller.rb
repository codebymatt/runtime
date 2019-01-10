module V1
  class IndexesController < ApplicationController
    def healthcheck
      msg = { status: 200, message: "Everything's fine!" }
      render_success(200, msg)
    end
  end
end