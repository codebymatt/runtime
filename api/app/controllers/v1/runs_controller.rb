module V1
  class RunsController < ApplicationController
    before_action :check_authorization

    def create
      @run = current_user.runs.new(new_run_params)
      if @run.save
        render_success(200, run: serialized_run)
      else
        render_failure(400, errors: errors.messages)
      end
    end

    private

    def new_run_params
      run_details = params.require(:run_data).permit(:distance, :minutes, :seconds)
      distance = run_details["distance"].to_i

      minutes = run_details["minutes"].to_i
      seconds = run_details["seconds"].to_i
      time_in_seconds = (minutes * 60) + seconds

      { distance: distance, time: time_in_seconds }
    end

    def serialized_run
      {
        id: @run.id,
        distance: @run.distance,
        seconds: @run.time,
        pace: @run.pace,
        date: @run.date.to_date
      }
    end
  end
end