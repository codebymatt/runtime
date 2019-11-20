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

    context "with negative distance" do
      before { run.distance = -1000 }

      it "does not pass validation" do
        expect { run.save! }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context "with non-integer distance" do
      before { run.distance = 200.7 }

      it "does not pass validation" do
        expect { run.save! }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context "when time is negative" do
      before { run.time = -400 }

      it "does not pass validation" do
        expect { run.save! }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context "when time is non-integer" do
      before { run.time = 122.6 }

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

    context "with a date in the future" do
      before { run.date = 10.days.from_now }

      it "does not pass validations" do
        expect { run.save! }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context "with a date in the past" do
      before { run.date = 10.days.ago }

      it "succeeds" do
        expect(run.save!).to be(true)
      end

      it "sets the correct date" do
        run.save!
        expect(run.reload.date).to be_within(1.second).of(10.days.ago)
      end
    end
  end

  context "when a run has been saved without being given a date" do
    before { run.save! }

    it "adds a date attribute" do
      expect(Run.first.date).to be_present
    end

    it "adds an accurate date attribute" do
      expect(Run.first.date.to_date).to eq(Date.today)
    end
  end

  context "when calculating pace" do
    let(:expected_pace) { (run.distance.to_f / run.time).round(2) }

    it "calculates it accurately" do
      expect(run.pace).to eq(expected_pace)
    end
  end
end
