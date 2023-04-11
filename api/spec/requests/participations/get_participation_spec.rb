# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'GET /groups/:group_id/participations/:id', type: :request do
  context 'when signed in' do
    before { sign_in user }

    let(:group) { create :group, :with_participants, :with_wishlists }
    let(:user) { group.users.first! }
    let(:other_user) { group.users.second! }
    let(:participation) { group.participations.find_by!(user_id: user.id) }
    let(:other_participation) { group.participations.find_by!(user_id: other_user.id) }

    context "when requesting the logged in user's participation" do
      it "returns information about the user's own participation" do
        get group_participation_path(group, 'own'), as: :json
        expect(response).to have_http_status(:success)
        expect(response.parsed_body['success']).to eq true
        expect(response.parsed_body['data']['wishlist']).to be_present
        expect(response.parsed_body['data']['present_status']).to be_present
      end
    end

    context "when requesting the logged in user's assignee's participation" do
      context 'when the logged in user has an assigned participation' do
        before { other_participation.update!(sint_id: user.id) }

        it "returns information about the assignee's participation" do
          get group_participation_path(group, 'assigned'), as: :json
          expect(response).to have_http_status(:success)
          expect(response.parsed_body['success']).to eq true
          expect(response.parsed_body['data']['wishlist']).to be_present
          expect(response.parsed_body['data']['user']['email']).to be_present
          expect(response.parsed_body['data']['present_status']).not_to be_present
        end
      end

      context 'when the logged in user does not have an assigned participation' do
        it 'returns a not found error' do
          expect do
            get group_participation_path(group, 'assigned'), as: :json
          end.to raise_error ActiveRecord::RecordNotFound
        end
      end
    end

    context "when it is another user's participation" do
      it 'is forbidden' do
        get group_participation_path(group, other_participation), as: :json
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  context 'when not signed in' do
    let(:group) { create :group, :with_participants }
    let(:participation) { group.participations.first! }

    it 'is unauthorized' do
      get group_participation_path(group, participation), as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
