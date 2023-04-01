class Group < ApplicationRecord
  has_many :participations
  has_many :users, through: :participations

  validates :title, presence: true

  def wishlist_count
    participations.where.not(wishlist: nil).count
  end
end
