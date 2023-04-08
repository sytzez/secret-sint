# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Group, type: :model do
  describe 'associations' do
    it { should have_many(:participations).dependent(:destroy) }
    it { should have_many(:users).through(:participations) }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
  end

  describe '#wishlist_count' do
    subject { group.wishlist_count }

    context 'when nobody has a wishlist' do
      let(:group) { create :group, :with_participants }
      it { is_expected.to be 0 }
    end

    context 'when participants have a wishlist' do
      let(:group) { create(:group, :with_participants, :with_wishlists, num_participants: 4) }
      it { is_expected.to be 4 }
    end
  end

  describe '#ordered_count' do
    subject { group.ordered_count }

    context 'when participants have a wishlist but have not ordered' do
      let(:group) { create :group, :with_participants, :with_wishlists }
      it { is_expected.to be 0 }
    end

    context 'when participants have ordered' do
      let(:group) { create(:group, :with_participants, :with_wishlists, :with_ordered_presents, num_participants: 4) }
      it { is_expected.to be 4 }
    end

    context 'when presents have been delivered' do
      let(:group) { create(:group, :with_participants, :with_wishlists, :with_delivered_presents, num_participants: 4) }
      it { is_expected.to be 4 }
    end
  end

  describe '#delivered_count' do
    subject { group.delivered_count }

    context 'when participants have ordered' do
      let(:group) { create(:group, :with_participants, :with_wishlists, :with_ordered_presents, num_participants: 4) }
      it { is_expected.to be 0 }
    end

    context 'when presents have been delivered' do
      let(:group) { create(:group, :with_participants, :with_wishlists, :with_delivered_presents, num_participants: 4) }
      it { is_expected.to be 4 }
    end
  end

  describe '#invite!' do
    subject { group.invite!(user) }

    let(:group) { create(:group, :with_participants) }

    context 'when the user is not participating yet' do
      let(:user) { create :user }

      it 'should add a participation to the group' do
        expect { subject }.to change { group.participations.count }.by(1)
      end

      it 'should add the user to the group' do
        expect { subject }.to change { group.users.count }.by(1)
      end

      it "should add the group to the user's list of groups" do
        expect { subject }.to change { user.groups.count }.by(1)
      end
    end

    context 'when the user is already participating' do
      let(:user) { group.users.first }

      it 'should raise an error' do
        expect { subject }.to raise_error InvitationError
      end
    end

    context 'when the group has already started' do
      let(:group) { create(:group, :with_participants, has_started: true) }
      let(:user) { create :user }

      it 'should raise an error' do
        expect { subject }.to raise_error InvitationError
      end
    end
  end
end
