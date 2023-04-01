# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: resource, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: { success: true }, status: :ok
    else
      render json: { success: false, message: 'You were not logged in' }, status: :unauthorized
    end
  end
end
