require "rails_helper"

describe V1::RunsController, type: :request do
  context "when creating a run" do
    let(:user) { create(:user) }
    let(:valid_run_details) { { run_data: { distance: 5000, minutes: 20, seconds: 57 } } }
    let(:create_run_post) { post "/v1/runs.json", params: valid_run_details }

    context "with a logged in user" do
      before { login(user) }

      context "with valid data" do
        let(:calculated_pace) { (5000.to_f / 1257).round(2) }
        let(:expected_run_data) do
          {
            run: {
              id: Run.first.id,
              distance: 5000,
              seconds: 1257,
              pace: calculated_pace,
              date: Date.today
            }
          }.to_json
        end

        before { create_run_post }

        it "returns successfully" do
          expect(response).to have_http_status(:ok)
        end

        it "returns the correct info" do
          expect(response.body).to eq(expected_run_data)
        end
      end

      context "without valid data" do
        let(:invalid_run_details) { { run_data: { distance: -400, minutes: 3.6, seconds: -6 } } }

        before { post "/v1/runs.json", params: invalid_run_details }

        it "returns unsuccessfully" do
          expect(response).to have_http_status(:bad_request)
        end
      end
    end

    context "without a logged in user" do
      before { create_run_post }

      it "returns unauthorised" do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end