class Group < ApplicationRecord
  has_many :participations
  has_many :users, through: :participations

  validates :title, presence: true

  def wishlist_count
    participations.where.not(wishlist: nil)
                  .count
  end

  def ordered_count
    participations.where(present_status: Participation.present_statuses[:ordered])
                  .count
  end

  def delivered_count
    participations.where(present_status: Participation.present_statuses[:delivered])
                  .count
  end
end
