require "rails_helper"

describe ApplicationController, type: :request do
  context "when making any request" do
    before { get "/v1", headers: { accept: "text/html" } }

    it "responds with a 406 if the application type is not JSON" do
      expect(response).to have_http_status(406)
    end
  end

  context "when responding to any request" do
    let(:content_type) { response.headers["Content-Type"] }
    before { get "/v1" }

    it "has format JSON" do
      expect(content_type).to eq("application/json; charset=utf-8")
    end
  end
end