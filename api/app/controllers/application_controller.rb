# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authenticate_user!

  rescue_from InvitationError | AssignSecretSintsError do |e|
    render json: { success: false, message: e.message }
  end
end
