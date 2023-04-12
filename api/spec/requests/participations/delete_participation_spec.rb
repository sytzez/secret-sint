# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'DELETE /groups/:group_id/participations/:id', type: :request do
  context 'when signed in' do
    before { sign_in user }

    let(:group) { create :group, :with_participants, :with_wishlists }
    let(:user) { group.users.first! }
    let(:other_user) { group.users.second! }
    let(:participation) { group.participations.find_by!(user_id: user.id) }
    let(:other_participation) { group.participations.find_by!(user_id: other_user.id) }

    context "when deleting the logged in user's participation" do
      it 'removes them from the group' do
        delete group_participation_path(group, 'own'), as: :json
        expect(response).to have_http_status(:success)
        expect(group.users.where(id: user.id)).not_to exist
        expect(user.groups.where(id: group.id)).not_to exist
      end
    end

    context "when deleting the logged in user's assignee's participation" do
      before { other_participation.update!(sint_id: user.id) }

      it 'is forbidden' do
        delete group_participation_path(group, 'assigned'), as: :json
        expect(response).to have_http_status(:forbidden)
      end
    end

    context "when deleting another user's participation" do
      it 'is forbidden' do
        delete group_participation_path(group, other_participation), as: :json
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  context 'when not signed in' do
    let(:group) { create :group, :with_participants }
    let(:participation) { group.participations.first! }

    it 'is unauthorized' do
      delete group_participation_path(group, participation), as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
