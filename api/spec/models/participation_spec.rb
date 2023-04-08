# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Participation, type: :model do
  describe 'enums' do
    it { should define_enum_for(:present_status) }
  end

  describe 'associations' do
    it { should belong_to :group }
    it { should belong_to :user }
    it { should belong_to(:sint).class_name('User').optional }
  end

  describe 'validations' do
    it { should validate_presence_of :present_status }
  end
end
