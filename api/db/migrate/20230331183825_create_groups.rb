# frozen_string_literal: true

class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.string :title
      t.boolean :has_started, default: false, null: false
      t.date :deadline, null: true

      t.timestamps
    end
  end
end
