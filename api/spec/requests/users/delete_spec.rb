require "rails_helper"

describe V1::UsersController, type: :request do
  context "when destroying a user" do
    let!(:user) { create(:user) }

    context "with valid credentials" do
      before do
        login(user)
        delete "/v1/user"
      end

      it "returns successfully" do
        expect(response).to have_http_status(:ok)
      end

      it "destroys user" do
        expect { User.find(user.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it "deletes session cookie" do
        expect(cookies[:_runtime_session]).to eq("")
      end
    end

    context "with invalid credentials" do
      before { delete "/v1/user" }

      it "returns unauthorized" do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end