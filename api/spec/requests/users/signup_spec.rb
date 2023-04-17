# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'POST /signup', type: :request do
  context 'with valid params' do
    let(:params) { { user: { email: Faker::Internet.email, password: 'supersecret' } } }

    it 'creates a user' do
      expect do
        post user_registration_path, params:, as: :json
      end.to change(User, :count).by(1)

      expect(response).to have_http_status(:success)
    end
  end

  context 'with invalid params' do
    let(:params) { { user: { email: 'notanemail', password: 'short' } } }

    it 'returns an error' do
      expect do
        post user_registration_path, params:, as: :json
      end.not_to change(User, :count)

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
