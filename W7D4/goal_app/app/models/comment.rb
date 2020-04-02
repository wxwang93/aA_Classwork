class Comment < ApplicationRecord
    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

     belongs_to :goal,
        foreign_key: :goal_id,
        class_name: :Goal
end
