class AddIndexToPosts < ActiveRecord::Migration[5.2]
  def change
    add_index :posts, :title
    add_index :posts, :author_id
  end
end
