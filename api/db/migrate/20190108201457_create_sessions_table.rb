class CreateSessionsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions do |t|
      t.string :token
      t.datetime :expiry_date
      t.integer :user_id

      t.timestamps
    end
    add_index :sessions, :token
  end
end
