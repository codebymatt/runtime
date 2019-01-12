require "rails_helper"

describe V1::UsersController, type: :request do
  let!(:user) { create(:user) }

  context "when retrieving users" do
    context "with valid cookie" do
      let(:expected_user_data) do
        {
          user: {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
          }
        }.to_json
      end

      before do
        login(user)
        get "/v1/user"
      end

      it "returns successfully" do
        expect(response).to have_http_status(:ok)
      end

      it "returns the users data" do
        expect(response.body).to eq(expected_user_data)
      end
    end

    context "without a cookie" do
      let(:expected_unauthorized_response) { { reason: "unauthorized_request" }.to_json }
      before { get "/v1/user" }

      it "returns unauthorized" do
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns correct response" do
        expect(response.body).to eq(expected_unauthorized_response)
      end
    end
  end

  context "with an invalid cookie" do
    let(:expected_not_found_response) { { reason: "resource_not_found" }.to_json }
    before do
      cookies[:_runtime_session] = "abcdefghijklmnop"
      get "/v1/user"
    end

    it "returns resource not found" do
      expect(response).to have_http_status(:not_found)
    end

    it "returns correct response" do
      expect(response.body).to eq(expected_not_found_response)
    end
  end

  context "with an expired cookie" do
    let(:expected_not_found_response) { { reason: "resource_not_found" }.to_json }

    before do
      login(user)
      Session.find_by(user_id: user.id).update(expiry_date: Time.now - 1.hour)
      get "/v1/user"
    end

    it "returns resource not found" do
      expect(response).to have_http_status(:not_found)
    end

    it "returns correct response" do
      expect(response.body).to eq(expected_not_found_response)
    end
  end
end