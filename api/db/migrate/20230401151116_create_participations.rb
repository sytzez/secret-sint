# frozen_string_literal: true

class CreateParticipations < ActiveRecord::Migration[7.0]
  def change
    create_table :participations do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :group, index: true, foreign_key: true
      t.belongs_to :sint, null: true, index: true, foreign_key: { to_table: :users }

      t.string :wishlist, null: true
      t.integer :present_status
      t.datetime :eta, null: true

      t.timestamps
    end
  end
end
