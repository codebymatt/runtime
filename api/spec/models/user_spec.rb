require "rails_helper"

describe User, type: :model do
  context "when creating a user" do
    let(:user) { build(:user) }

    context "with valid input" do
      let(:created_user) do
        user.save
        user.reload
      end

      it "is successful" do
        expect(user.save).to be(true)
      end

      it "creates a session after creation" do
        expect(created_user.session).to be_present
      end
    end

    context "without an email" do
      before { user.email = nil }
      it "does not succeed" do
        expect(user.save).to be(false)
      end
    end

    context "without a unique email" do
      before { User.create(first_name: "Dwight", email: user.email, password: "beetsbearsbattle") }
      it "does not succeed" do
        expect(user.save).to be(false)
      end
    end

    context "without a valid email" do
      before { user.email = "abc" }
      it "does not succeed" do
        expect(user.save).to be(false)
      end
    end

    context "with too short a password" do
      before { user.password = "2short" }
      it "does not succeed" do
        expect(user.save).to be(false)
      end
    end

    context "without a password" do
      before { user.password = nil }
      it "does not succeed" do
        expect(user.save).to be(false)
      end
    end

    context "with a plaintext password" do
      let(:saved_user) { User.find_by_email(user.email) }
      before { user.save }

      it "encrypts it properly" do
        expect(saved_user.password).not_to eq(user.password)
      end
    end
  end
end
