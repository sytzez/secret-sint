class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.string :title
      t.boolean :has_started
      t.date :deadline

      t.timestamps
    end
  end
end
