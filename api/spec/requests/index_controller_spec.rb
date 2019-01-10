require "rails_helper"

describe V1::IndexesController, type: :request do
  context "when a GET request is made to the homepage" do
    let(:get_request) { get "/" }

    it "is redirected to the V1 homepage" do
      expect(get_request).to redirect_to("/v1/")
    end
  end

  context "when a GET request is made to the V1 homepage" do
    let(:healthcheck_json) { { status: 200, message: "Everything's fine!" }.to_json }
    before { get "/v1/" }

    it "returns a healthcheck" do
      expect(response.body).to eq(healthcheck_json)
    end
  end

  context "when a GET request is made to the healthcheck route" do
    let(:healthcheck_json) { { status: 200, message: "Everything's fine!" }.to_json }
    before { get "/v1/healthcheck" }

    it "returns a healthcheck" do
      expect(response.body).to eq(healthcheck_json)
    end
  end

  context "when a non-GET request is made to the V1 homepage" do
    let(:invalid_post) { post "/v1/" }

    it "returns a healthcheck" do
      expect{ invalid_post }.to raise_error(ActionController::RoutingError)
    end
  end
end