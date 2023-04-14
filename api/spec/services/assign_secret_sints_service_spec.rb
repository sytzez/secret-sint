# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AssignSecretSintsService, type: :service do
  let(:service) { described_class.new(group) }

  describe '#validate!' do
    subject { service.validate! }

    context 'when Secret Sints have already been assigned' do
      let(:group) { create :group, :with_participants, :with_wishlists, num_participants: 3, has_started: true }

      it 'raises an error' do
        expect { subject }.to raise_error(AssignSecretSintsError)
      end
    end

    context 'when there are less than 3 participants' do
      let(:group) { create :group, :with_participants, :with_wishlists, num_participants: 2 }

      it 'raises an error' do
        expect { subject }.to raise_error(AssignSecretSintsError)
      end
    end

    context 'a participant has not filled in their wishlist' do
      let(:group) { create :group, :with_participants, :with_wishlists, num_participants: 4 }

      before { group.participations.first.update!(wishlist: '') }

      it 'raises an error' do
        expect { subject }.to raise_error(AssignSecretSintsError)
      end
    end

    context 'when the group is ready' do
      let(:group) { create :group, :with_participants, :with_wishlists, num_participants: 3 }

      it 'should not raise an error' do
        expect { subject }.not_to raise_error
      end
    end
  end

  describe 'call' do
    subject { service.call }

    let(:group) { create :group, :with_participants, :with_wishlists, num_participants: 3 }
    let(:participations) { group.participations }

    it 'should start the group' do
      expect { subject }.to(change { group.reload.has_started? }.to(true))
    end

    it 'should assign a different Secret Sint, which is another participant, to each participant' do
      service.call

      participations.each do |participation|
        expect(participation.user_id).not_to eq participation.sint_id
        expect(participations.where(sint_id: participation.user_id).count).to be 1
      end
    end
  end
end
