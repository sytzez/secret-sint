# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'GET /groups', type: :request do
  context 'when signed in' do
    before { sign_in user }

    let!(:other_groups) { create_list :group, 2 }

    context 'when the user has groups' do
      let(:user) { create :user, :with_groups, num_groups: 4 }

      it 'returns all groups belonging to the user' do
        get groups_path, as: :json
        expect(response).to have_http_status(:success)
        expect(response.parsed_body['success']).to eq true
        expect(response.parsed_body['data'].length).to eq 4
      end
    end

    context 'when the user has no groups' do
      let(:user) { create :user }

      it 'returns an empty array' do
        get groups_path, as: :json
        expect(response).to have_http_status(:success)
        expect(response.parsed_body['success']).to eq true
        expect(response.parsed_body['data'].length).to eq 0
      end
    end
  end

  context 'when not signed in' do
    it 'is unauthorized' do
      get groups_path, as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
