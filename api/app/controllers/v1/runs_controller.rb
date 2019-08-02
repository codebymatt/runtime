module V1
  class RunsController < ApplicationController
    before_action :check_authorization
    before_action :select_run, only: [:show, :destroy]

    def index
      render_success(200, runs: serialized_runs)
    end

    def show
      render_success(200, run: @run.serialized_data)
    end

    def create
      @run = current_user.runs.new(new_run_params)
      if @run.save
        render_success(200, run: @run.serialized_data)
      else
        render_failure(400, errors: @run.errors.messages)
      end
    end

    def destroy
      if @run.destroy
        render_success
      else
        render_failure(400, "could not delete run")
      end
    end

    private

    def select_run
      run_id = params[:id].to_i
      @run = current_user.runs.find_by(id: run_id)
      return render_json_404 if @run.nil?
    end

    def new_run_params
      run_details = params.require(:run_data).permit(:distance, :minutes, :seconds)
      distance = run_details["distance"].to_i

      minutes = run_details["minutes"].to_i
      seconds = run_details["seconds"].to_i
      time_in_seconds = (minutes * 60) + seconds

      { distance: distance, time: time_in_seconds }
    end

    def serialized_runs
      current_user.runs.map(&:serialized_data)
    end
  end
end