module V1
  class AuthenticationController < ApplicationController
    def login
      # Note: if we trust any valid cookie and replenish it on login, an
      # attacker could remain perpetually logged in to a session that's not theirs by hitting this
      # endpoint at least once a week. So don't check for cookies.
      render_success(200)
    end
  end
end