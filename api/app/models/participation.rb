class Participation < ApplicationRecord
  belongs_to :group
  belongs_to :user
  belongs_to :assigned_user, class_name: 'User'
end
