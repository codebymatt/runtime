class CreateRuns < ActiveRecord::Migration[5.2]
  def change
    create_table :runs do |t|
      t.integer :distance
      t.integer :time
      t.decimal :pace
      t.datetime :date
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
