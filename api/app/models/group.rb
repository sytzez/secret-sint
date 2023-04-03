# frozen_string_literal: true

class Group < ApplicationRecord
  has_many :participations, dependent: :destroy
  has_many :users, through: :participations

  validates :title, presence: true

  def wishlist_count
    participations.where.not(wishlist: nil)
                  .count
  end

  def ordered_count
    statuses = [
      Participation.present_statuses[:ordered],
      Participation.present_statuses[:delivered],
    ]

    participations.where(present_status: statuses).count
  end

  def delivered_count
    participations.where(present_status: Participation.present_statuses[:delivered])
                  .count
  end

  def invite!(user)
    raise InvitationError, 'This user is already part of the group' if participations.exists?(user_id: user.id)

    participations.create(user: user)
  end
end
