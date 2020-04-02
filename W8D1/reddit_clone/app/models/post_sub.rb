class PostSub < ApplicationRecord
    validates :post_id, :sub_id, presence: true 

    has_many :posts, 
        class_name: :Post, 
        foreign_key: :post_id

    has_many :subs, 
        class_name: :Sub, 
        foreign_key: :sub_id
end
