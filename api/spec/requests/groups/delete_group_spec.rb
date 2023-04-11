# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'DELETE /groups/:id', type: :request do
  context 'when signed in' do
    before { sign_in user }

    let(:user) { create :user, :with_groups }

    context 'if the group belongs to the user' do
      let(:group) { user.groups.first }

      it 'deletes the group' do
        delete group_path(group), as: :json
        expect(response).to have_http_status(:success)
        expect { group.reload }.to raise_error ActiveRecord::RecordNotFound
      end
    end

    context 'if the group does not belong to the user' do
      let(:group) { create :group }

      it 'raises a not found exception' do
        expect do
          delete group_path(group), as: :json
        end.to raise_error ActiveRecord::RecordNotFound
      end
    end

    context 'if the group does not exist' do
      it 'raises a not found exception' do
        expect do
          delete group_path(999), as: :json
        end.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end

  context 'when not signed in' do
    let(:group) { create :group }

    it 'is unauthorized' do
      delete group_path(group), as: :json
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
