class AddUserToSession < ActiveRecord::Migration[5.2]
  def change
    remove_column :sessions, :user_id
    add_reference :sessions, :user, foreign_key: true
  end
end
