# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'PATCH /groups/:id', type: :request do
  let(:valid_params) { { group: { title: 'New title' } } }
  let(:invalid_params) { { group: { title: '' } } }

  context 'when signed in' do
    before { sign_in user }

    let(:user) { create :user, :with_groups }

    context 'if the group belongs to the user' do
      let(:group) { user.groups.first }

      context 'with valid params' do
        it 'updates the group' do
          patch group_path(group), params: valid_params, as: :json
          expect(response).to have_http_status(:success)
          group.reload
          expect(group.title).to eq 'New title'
        end
      end

      context 'with invalid params' do
        it 'returns an error' do
          patch group_path(group), params: invalid_params, as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context 'if the group does not belong to the user' do
      let(:group) { create :group }

      it 'raises a not found exception' do
        expect do
          patch group_path(group), params: valid_params, as: :json
        end.to raise_error ActiveRecord::RecordNotFound
      end
    end

    context 'if the group does not exist' do
      it 'raises a not found exception' do
        expect do
          patch group_path(999), params: valid_params, as: :json
        end.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end

  context 'when not signed in' do
    let(:group) { create :group }

    it 'is unauthorized' do
      patch group_path(group), params: valid_params, as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
