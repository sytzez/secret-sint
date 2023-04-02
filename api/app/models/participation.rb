# frozen_string_literal: true

class Participation < ApplicationRecord
  enum present_status: {
    not_started: 0,
    ordered: 1,
    delivered: 2
  }, _default: :not_started

  belongs_to :group
  belongs_to :user
  belongs_to :sint, class_name: 'User', optional: true

  validates :present_status, presence: true
end
