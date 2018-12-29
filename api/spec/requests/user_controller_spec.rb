require "rails_helper"

describe V1::UsersController, type: :request do
  context "when creating user" do
    let(:data) do
      {
        user: {
          email: "matt@example.com",
          first_name: "Matt",
          password: "elementarydearwatson"
        }
      }
    end

    context "with valid credentials" do
      let(:created_user_present) { User.find_by_email(data[:user][:email]).present? }
      before { post "/v1/users", params: data }

      it "should succeed" do
        expect(created_user_present).to be(true)
      end

      it "responds successfully" do
        expect(response).to have_http_status(:ok)
      end
    end

    context "without a unique email" do
      let(:create_original_user) { User.create(data[:user]) }

      before do
        create_original_user
        post "/v1/users", params: data
      end

      it "should not create a duplicate user" do
        expect(User.where(email: data[:user][:email]).count).to eq(1)
      end

      it "should fail" do
        expect(response).to have_http_status(:error)
      end
    end

    context "without an email" do
      it "should fail" do
      end
    end

    context "with too short a password" do
      it "should fail" do
      end
    end

    context "with no password" do
      it "should fail" do
      end
    end
  end
end