require "rails_helper"

describe V1::AuthenticationController, type: :request do
  context "when logging user in" do
    let!(:user) { create(:user, password: "elephant") }

    context "with valid credentials" do
      let(:valid_creds) { { credentials: { email: user.email, password: "elephant" } } }
      before { post "/v1/login", params: valid_creds.to_json }

      it "returns successfully" do
        expect(response).to have_http_status(:ok)
      end

      it "sets a cookie" do
      end

      it "returns user data" do
      end
    end

    context "with invalid credentials" do
      it "returns unauthorised" do
      end
    end
  end
end