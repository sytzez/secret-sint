# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'POST /groups', type: :request do
  let(:valid_params) { { group: { title: 'My first group' } } }
  let(:invalid_params) { { group: { title: '' } } }

  context 'when signed in' do
    before { sign_in user }

    let(:user) { create :user }

    context 'with valid params' do
      it 'creates a post, with the user as a participant' do
        post groups_path, params: valid_params, as: :json
        expect(response).to have_http_status(:created)
        expect(response.parsed_body['success']).to eq true
        expect(user.groups.where(title: 'My first group')).to exist
      end
    end

    context 'with_invalid_params' do
      it 'returns an error' do
        post groups_path, params: invalid_params, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  context 'when not signed in' do
    it 'is unauthorized' do
      post groups_path, params: valid_params, as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
