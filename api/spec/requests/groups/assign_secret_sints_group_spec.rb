# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'POST /groups/:id/assign_secret_sints', type: :request do
  context 'when signed in' do
    before { sign_in user }

    let(:user) { create :user }

    context 'if the group belongs to the user' do
      context 'if the group has not enough participants' do
        let(:group) { create :group, :with_participants, num_participants: 2 }
        let(:user) { group.users.first! }

        it 'returns an error' do
          post assign_secret_sints_group_path(group), as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context 'if not every participant has a wishlist' do
        let(:group) { create :group, :with_participants, num_participants: 4 }
        let(:user) { group.users.first! }

        it 'returns an error' do
          post assign_secret_sints_group_path(group), as: :json
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context 'if the group has enough participants and they all have wishlists' do
        let(:group) { create :group, :with_participants, :with_wishlists, num_participants: 4 }
        let(:user) { group.users.first! }

        it 'starts the group' do
          post assign_secret_sints_group_path(group), as: :json
          expect(response).to have_http_status(:success)
          group.reload
          expect(group.has_started?).to eq true
        end
      end
    end

    context 'if the group does not belong to the user' do
      let(:group) { create :group }

      it 'raises a not found exception' do
        expect do
          post assign_secret_sints_group_path(group), as: :json
        end.to raise_error ActiveRecord::RecordNotFound
      end
    end

    context 'if the group does not exist' do
      it 'raises a not found exception' do
        expect do
          patch group_path(999), as: :json
        end.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end

  context 'when not signed in' do
    let(:group) { create :group }

    it 'is unauthorized' do
      post assign_secret_sints_group_path(group), as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
