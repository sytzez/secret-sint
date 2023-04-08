# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should have_many(:participations).dependent(:destroy) }
    it { should have_many(:groups).through(:participations) }
  end
end
