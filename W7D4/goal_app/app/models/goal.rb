class Goal < ApplicationRecord
    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User
    
    has_many :comments,
        foreign_key: :goal_id,
        class_name: :Comment
end
