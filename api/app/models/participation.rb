class Participation < ApplicationRecord
  enum present_status: {
    not_started: 0,
    ordered: 1,
    delivered: 2,
  }

  belongs_to :group
  belongs_to :user
  belongs_to :assigned_user, class_name: 'User', optional: true

  validates :present_status, presence: true
end
