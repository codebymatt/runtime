class RemovePaceColumnFromRun < ActiveRecord::Migration[5.2]
  def change
    remove_column :runs, :pace
  end
end
