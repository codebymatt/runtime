require "rails_helper"

describe V1::UsersController, type: :request do
  context "when retrieving users" do
    let!(:user) { create(:user) }

    context "with valid cookie" do
      it "returns the users data" do
      end
    end
  end
end