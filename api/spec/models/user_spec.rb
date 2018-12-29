require "rails_helper"

describe User, type: :model do
  context "when creating a user" do
    context "with valid input" do
      it "is successful" do
      end
    end

    context "without a unique email" do
      it "throws an exception" do
      end
    end

    context "without a valid email" do
      it "throws an exception" do
      end
    end

    context "without a valid password" do
      it "throws an exception" do
      end
    end

    context "without a password" do
      it "throws an exception" do
      end
    end

    context "with a plaintext password" do
      it "encrypts it properly" do
      end
    end
  end
end
