require "rails_helper"

describe V1::AuthenticationController, type: :request do
  let!(:user) { create(:user, password: "elephant") }
  # let!(:old_token) { user.session.token }

  context "when logging user in" do
    let(:valid_creds) { { credentials: { email: user.email, password: "elephant" } } }
    before { Session.find_by_user_id(user.id).destroy }

    context "with valid credentials" do
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
        post "/v1/login", params: valid_creds
      end

      it "returns successfully" do
        expect(response).to have_http_status(:ok)
      end

      it "sets a cookie" do
        expect(cookies[:_runtime_session]).to be_present
      end

      it "returns user data" do
        expect(response.body).to eq(expected_user_data)
      end

    end

    context "when the users old session isn't valid" do
      let(:old_token) { user.session.token }
      before do
        Session.create(user: user).update!(expiry_date: Time.now - 2.weeks)
        old_token
        post "/v1/login", params: valid_creds
      end

      it "generates a new session cookie" do
        expect(cookies[:_runtime_session]).not_to eq(old_token)
      end
    end

    context "with invalid password" do
      let(:invalid_creds) { { credentials: { email: user.email, password: "giraffe" } } }
      let(:expected_response_body) { { reason: "bad_login" }.to_json }
      before do
        post "/v1/login", params: invalid_creds
      end

      it "returns unauthorised" do
        expect(response).to have_http_status(:unauthorized)
      end

      it "has expected reason" do
        expect(response.body).to eq(expected_response_body)
      end
    end

    context "with non-existing email" do
      let(:invalid_creds) { { credentials: { email: "marty@brooklyn.zoo", password: "giraffe" } } }
      let(:expected_response_body) { { reason: "bad_login" }.to_json }

      before do
        post "/v1/login", params: invalid_creds
      end

      it "returns unauthorised" do
        expect(response).to have_http_status(:unauthorized)
      end

      it "has expected reason" do
        expect(response.body).to eq(expected_response_body)
      end
    end
  end

  context "when logging user out" do
    let(:session) { Session.find_by_user_id(user.id) }

    before do
      login(user)
      post "/v1/logout"
    end

    it "succeeds" do
      expect(response).to have_http_status(:ok)
    end

    it "removes users session from database" do
      expect(session).not_to be_present
    end
  end
end