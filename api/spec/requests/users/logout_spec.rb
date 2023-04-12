# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'DELETE /logout', type: :request do
  context 'when signed in' do
    before { sign_in user }

    let(:user) { create :user }

    it 'logs out' do
      logout

      get groups_path, as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end

  context 'when not signed in' do
    it 'returns an error' do
      delete destroy_user_session_path, as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
