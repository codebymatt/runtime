require "rails_helper"

describe Session, type: :model do
  let(:original_user) { create(:user) }
  let(:valid_session) { Session.create(user: original_user) }

  context "when creating a session" do
    let(:secondary_user) { create(:user) }

    context "with unique user id" do
      it "succeeds" do
        expect(valid_session).to be_present
      end
    end

    context "without user id" do
      let(:create_invalid_session) { Session.create!(user: nil) }

      it "fails" do
        expect { create_invalid_session }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context "with duplicate user id" do
      let(:create_invalid_session) { Session.create!(user: original_user)}
      before { valid_session }

      it "fails" do
        expect { create_invalid_session }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    it "sets an expiry date of a week" do
      expect(valid_session.expiry_date).to be_within(1.second).of (Time.now + 7.days)
    end

    it "sets a token of length 24" do
      expect(valid_session.token.length).to eq(24)
    end
  end

  context "when user is deleted" do
    let!(:user_id) { original_user.id }
    before do
      valid_session
      original_user.destroy
    end

    it "destroys associated tokens" do
      expect(Session.find_by_user_id(user_id)).not_to be_present
    end
  end
end