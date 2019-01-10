require "rails_helper"

describe ApplicationController, type: :request do
  context "when making any request" do
    before { get "/" }

    it "responds with a 406 if the application type is not JSON" do
      expect(response).to have_http_status(406)
    end
  end
end