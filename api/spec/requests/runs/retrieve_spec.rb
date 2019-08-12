require "rails_helper"

describe V1::RunsController, type: :request do
  context "when viewing all runs" do
    context "with a logged in user" do
      let(:user) { create(:user) }
      let(:expected_first_run_data) { JSON.parse(Run.first.serialized_data.to_json) }

      before do
        login(user)
        create_list(:run, 5, user_id: user.id)
        get "/v1/runs.json"
      end

      it "returns successfully" do
        expect(response).to have_http_status(:ok)
      end

      it "has the correct number of objects" do
        expect(json_body["runs"].length).to eq(5)
      end

      it "returns run objects" do
        # Test 'last' since run order is reversed in controller
        expect(json_body["runs"].last).to eq(expected_first_run_data)
      end
    end

    context "without a logged in user" do
      before { get "/v1/runs.json" }

      it "returns unauthorised" do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  context "when viewing a single run" do
    let(:user) { create(:user) }
    let(:run) { create(:run, user_id: user.id) }
    let(:get_run_request) { get "/v1/runs/#{run.id}.json" }

    context "with a logged in user" do
      before { login(user) }

      context "when it belongs to the user" do
        context "when the run exists" do
          let(:expected_run_data) { JSON.parse(run.serialized_data.to_json) }

          before { get_run_request }

          it "returns successfully" do
            expect(response).to have_http_status(:ok)
          end

          it "returns the correct data" do
            expect(json_body["run"]).to eq(expected_run_data)
          end
        end

        context "when the run doesn't exist" do
          before { get "/v1/runs/0.json" }

          it "returns a 404" do
            expect(response).to have_http_status(:not_found)
          end
        end
      end

      context "when it doesn't belong to the user" do
        let(:other_user) { create(:user) }
        let(:other_run) { create(:run, user_id: other_user.id) }

        before { get "/v1/runs/#{other_run.id}.json" }

        it "returns a 404" do
          expect(response).to have_http_status(:not_found)
        end
      end
    end

    context "without a logged in user" do
      before { get_run_request }

      it "returns unauthorised" do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end