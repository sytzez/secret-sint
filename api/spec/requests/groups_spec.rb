# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Groups', type: :request do
  context 'when signed in' do
    before { sign_in user }

    let(:user) { create :user, :with_groups, num_groups: 4 }

    describe 'GET /groups' do
      it 'shows all groups belonging to the user' do
        get groups_path, as: :json
        expect(response).to have_http_status(:success)
        expect(response.parsed_body['success']).to eq true
        expect(response.parsed_body['data'].length).to eq 4
      end
    end

    describe 'POST /groups' do
      it 'creates a group for the logged in user' do
        post groups_path, params: { group: { title: 'A group' } }, as: :json
        expect(response).to have_http_status(:created)
        expect(response.parsed_body['success']).to eq true
        expect(user.groups.where(title: 'A group')).to exist
      end
    end

    describe 'GET /groups/:id' do
      context 'if the group belongs to the user' do
        it 'returns information about the group' do
          get group_path(user.groups.first), as: :json
          expect(response).to have_http_status(:success)
          expect(response.parsed_body['success']).to eq true
          expect(response.parsed_body['data']['title']).to be_present
        end
      end

      context 'if the group does not belong to the user' do
        let(:other_group) { create :group }

        it 'raises a not found exception' do
          expect do
            get group_path(other_group), as: :json
          end.to raise_error ActiveRecord::RecordNotFound
        end
      end

      context 'if the group does not exist' do
        it 'raises a not found exception' do
          expect do
            get group_path(999), as: :json
          end.to raise_error ActiveRecord::RecordNotFound
        end
      end
    end

    describe 'PATCH /groups/:id' do
      let(:params) { { group: { title: 'New title' } } }

      context 'if the group belongs to the user' do
        it 'updates the group' do
          patch group_path(user.groups.first), params: params, as: :json
          expect(response).to have_http_status(:success)
          expect(user.groups.first.title).to eq 'New title'
        end
      end

      context 'if the group does not belong to the user' do
        let(:other_group) { create :group }

        it 'raises a not found exception' do
          expect do
            patch group_path(other_group), params: params, as: :json
          end.to raise_error ActiveRecord::RecordNotFound
        end
      end

      context 'if the group does not exist' do
        it 'raises a not found exception' do
          expect do
            patch group_path(999), params: params, as: :json
          end.to raise_error ActiveRecord::RecordNotFound
        end
      end
    end

    describe 'DELETE /groups/:id' do
      context 'if the group belongs to the user' do
        it 'deletes the group' do
          group = user.groups.first
          delete group_path(group), as: :json
          expect(response).to have_http_status(:success)
          expect { group.reload }.to raise_error ActiveRecord::RecordNotFound
        end
      end

      context 'if the group does not belong to the user' do
        let(:other_group) { create :group }

        it 'raises a not found exception' do
          expect do
            delete group_path(other_group), as: :json
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

    describe 'POST /groups/:id/assign_secret_sints' do
      context 'if the group belongs to the user' do
        context 'if the group is ready' do
          let(:group) { create :group, :with_participants, :with_wishlists }
          let(:user) { group.users.first }

          it 'starts the group' do
            post assign_secret_sints_group_path(group), as: :json
            expect(response).to have_http_status(:success)
            group.reload
            expect(group.has_started?).to eq true
          end
        end

        context 'if the group is not ready' do
          it 'returns an error response' do
            group = user.groups.first
            post assign_secret_sints_group_path(group), as: :json
            expect(response).to have_http_status(:unprocessable_entity)
            group.reload
            expect(group.has_started?).to eq false
          end
        end
      end

      context 'if the group does not belong to the user' do
        let(:other_group) { create :group }

        it 'raises a not found exception' do
          expect do
            post assign_secret_sints_group_path(other_group), as: :json
          end.to raise_error ActiveRecord::RecordNotFound
        end
      end

      context 'if the group does not exist' do
        it 'raises a not found exception' do
          expect do
            post assign_secret_sints_group_path(999), as: :json
          end.to raise_error ActiveRecord::RecordNotFound
        end
      end
    end
  end

  context 'when not signed in' do
    let(:group) { create :group }

    describe 'GET /groups' do
      it 'is unauthorized' do
        get groups_path, as: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end

    describe 'GET /groups/:id' do
      it 'is unauthorized' do
        get group_path(group), as: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end

    describe 'POST /groups' do
      it 'is unauthorized' do
        post groups_path, as: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end

    describe 'PATCH /groups/:id' do
      it 'is unauthorized' do
        patch group_path(group), as: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end

    describe 'DELETE /groups/:id' do
      it 'is unauthorized' do
        delete group_path(group), as: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end

    describe 'POST /groups/:id/assign_secret_sints' do
      it 'is unauthorized' do
        post assign_secret_sints_group_path(group), as: :json
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
