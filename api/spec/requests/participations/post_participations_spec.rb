# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'POST /groups/:group_id/participations', type: :request do
  let(:invitee_email) { 'the_invitee@test.com' }
  let(:valid_params) { { participation: { email: invitee_email } } }
  let(:invalid_params) { { participation: {} } }

  context 'when signed in' do
    before { sign_in user }

    let(:group) { create :group, :with_participants }
    let(:user) { group.users.first! }
    let(:other_user) { group.users.second! }

    context 'with valid params' do
      let(:invitee) { create :user }
      let(:invitee_email) { invitee.email }

      it 'adds the user to the group' do
        post group_participations_path(group), params: valid_params, as: :json
        expect(response).to have_http_status(:success)
        expect(group.users.where(id: invitee.id)).to exist
      end
    end

    context 'with invalid params' do
      it 'raises an error' do
        expect do
          post group_participations_path(group), params: invalid_params, as: :json
        end.to raise_error ActionController::ParameterMissing
      end
    end

    context 'when the invited user does not exist' do
      it 'returns an error' do
        post group_participations_path(group), params: valid_params, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'when the user is already in the group' do
      let(:invitee_email) { other_user.email }

      it 'returns an error' do
        post group_participations_path(group), params: valid_params, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'when the group has already started' do
      let(:group) { create :group, :with_participants, has_started: true }
      let(:invitee) { create :user }
      let(:invitee_email) { invitee.email }

      it 'returns an error' do
        post group_participations_path(group), params: valid_params, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  context 'when not signed in' do
    let(:group) { create :group }

    it 'is unauthorized' do
      post group_participations_path(group), params: valid_params, as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
