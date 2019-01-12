require "rails_helper"

describe V1::UsersController, type: :request do
  let(:user) { create(:user) }

  context "when updating user" do
    context "with valid credentials" do
      before { login(user) }

      context "when setting email to nil" do
        let!(:original_email) { user.email }
        let(:update_data) { { user: { email: nil } } }

        before { put "/v1/user", params: update_data }

        it "returns bad request" do
          expect(response).to have_http_status(:bad_request)
        end

        it "doesn't alter email" do
          expect(user.reload.email).to eq(original_email)
        end
      end

      context "when attempting to update password" do
        let!(:original_digest) { user.password_digest }
        let(:update_data) { { user: { password: "abc" } } }

        before { put "/v1/user", params: update_data }

        it "returns bad request" do
          expect(response).to have_http_status(:bad_request)
        end

        it "doesn't work" do
          expect(user.reload.password_digest).to eq(original_digest)
        end
      end

      context "with valid data" do
        let(:new_first_name) { "Dwight K" }
        let(:new_email) { "manager@schrutefarms.org" }
        let(:new_data) do
          {
            user: {
              email: new_email,
              first_name: new_first_name,
              last_name: user.last_name
            }
          }
        end

        before { put "/v1/user", params: new_data }

        it "returns successfully" do
          expect(response).to have_http_status(:ok)
        end

        it "returns updated user data" do
          expect(response.body).to eq(new_data.to_json)
        end

        it "persists non-email data" do
          expect(user.reload.first_name).to eq(new_first_name)
        end

        it "persists email data" do
          expect(user.reload.email).to eq(new_email)
        end
      end
    end

    context "with invalid credentials" do
      context "when updating with valid data" do
        let(:new_first_name) { "Dwight K" }
        let(:new_email) { "manager@schrutefarms.org" }
        let(:new_data) do
          {
            user: {
              email: new_email,
              first_name: new_first_name
            }
          }
        end

        before { put "/v1/user", params: new_data }

        it "returns unauthorized" do
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end
  end
end