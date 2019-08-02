require "rails_helper"

describe V1::RunsController, type: :request do
  context "when deleting a run" do
    let(:user) { create(:user) }

    before { login(user) }

    context "when it belongs to the user" do
      let(:run) { create(:run, user_id: user.id) }

      before { delete "/v1/runs/#{run.id}.json" }

      it "responds successfully" do
        expect(response).to have_http_status(:no_content)
      end

      it "deletes the record" do
        expect { Run.find(run.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context "when it doesn't belong to the user" do
      let(:other_user) { create(:user) }
      let(:run) { create(:run, user_id: other_user.id) }

      before do
        delete "/v1/runs/#{run.id}.json"
      end

      it "returns a 404" do
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end