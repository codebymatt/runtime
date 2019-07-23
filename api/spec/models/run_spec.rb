require "rails_helper"

describe Run, type: :model do
  let(:user) { create(:user) }
  let(:run) { build(:run, user_id: user.id) }

  context "when creating a run" do
    context "with valid inputs" do
      it "succeeds" do
        expect(run.save!).to be(true)
      end
    end

    context "with invalid distance" do
      before { run.distance = -1000 }

      it "does not pass validation" do
        expect { run.save! }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context "with invalid time" do
      before { run.time = -400 }

      it "does not pass validation" do
        expect { run.save! }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context "without associated user" do
      before { run.user_id = nil }

      it "does not pass validation" do
        expect { run.save! }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end

  context "when a run has been saved" do
    before { run.save! }

    it "adds a date attribute" do
      expect(Run.first.date).to be_present
    end

    it "adds an accurate date attribute" do
      expect(Run.first.date.to_date).to eq(Date.today)
    end
  end

  context "when calculating pace" do
    it "calculates it accurately" do
    end
  end
end
