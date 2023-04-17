# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'POST /login', type: :request do
  let(:user) { create :user }

  context 'with valid params' do
    let(:params) { { user: { email: user.email, password: user.password } } }

    it 'logs in' do
      post user_session_path, params:, as: :json
      expect(response).to have_http_status(:success)
    end
  end

  context 'with invalid params' do
    let(:params) { { user: { email: user.email, password: 'wrong password' } } }

    it 'returns an error' do
      post user_session_path, params:, as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
