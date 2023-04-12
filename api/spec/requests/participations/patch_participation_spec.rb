# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'PATCH /groups/:group_id/participations/:id', type: :request do
  let(:valid_params) { { participation: { wishlist: 'New wishlist', present_status: 'delivered' } } }
  let(:invalid_params) { { participation: { present_status: 'unknown' } } }

  context 'when signed in' do
    before { sign_in user }

    let(:group_has_started) { false }
    let(:group) { create :group, :with_participants, :with_wishlists, has_started: group_has_started }
    let(:user) { group.users.first! }
    let(:other_user) { group.users.second! }
    let(:participation) { group.participations.find_by!(user_id: user.id) }
    let(:other_participation) { group.participations.find_by!(user_id: other_user.id) }

    context "when updating the logged in user's participation" do
      context 'with valid params' do
        context 'when the group has not started' do
          it 'updates the wishlist status' do
            expect do
              patch group_participation_path(group, 'own'), params: valid_params, as: :json
              participation.reload
            end.to change { participation.wishlist }.to 'New wishlist'
          end

          it 'does not update the present status' do
            expect do
              patch group_participation_path(group, 'own'), params: valid_params, as: :json
              participation.reload
            end.not_to(change { participation.present_status })
          end
        end

        context 'when the group has started' do
          let(:group_has_started) { true }

          it 'updates the present status' do
            expect do
              patch group_participation_path(group, 'own'), params: valid_params, as: :json
              participation.reload
            end.to change { participation.present_status }.to 'delivered'
          end

          it 'does not update the wishlist' do
            expect do
              patch group_participation_path(group, 'own'), params: valid_params, as: :json
              participation.reload
            end.not_to(change { participation.wishlist })
          end
        end
      end

      context 'with invalid params' do
        let(:group_has_started) { true }

        it 'returns an error' do
          # Rails raises an ArgumentError if the updated enum value does not exist.
          expect do
            patch group_participation_path(group, 'own'), params: invalid_params, as: :json
          end.to raise_error ArgumentError
        end
      end
    end

    context "when updating the logged in user's assignee's participation" do
      before { other_participation.update!(sint_id: user.id) }

      it 'is forbidden' do
        patch group_participation_path(group, 'assigned'), params: valid_params, as: :json
        expect(response).to have_http_status(:forbidden)
      end
    end

    context "when it is another user's participation" do
      it 'is forbidden' do
        patch group_participation_path(group, other_participation), params: valid_params, as: :json
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  context 'when not signed in' do
    let(:group) { create :group, :with_participants }
    let(:participation) { group.participations.first! }

    it 'is unauthorized' do
      patch group_participation_path(group, participation), params: valid_params, as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
