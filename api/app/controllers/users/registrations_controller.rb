# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: resource, status: :ok
    else
      render json: resource.errors, status: :unprocessable_entity
    end
  end
end
