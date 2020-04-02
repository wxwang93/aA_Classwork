# == Schema Information
#
# Table name: subs
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :string           not null
#  mod_id      :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Sub < ApplicationRecord
    validates :title, :description, presence: true 

    belongs_to :moderator, 
        class_name: :User,
        foreign_key: :mod_id

    belongs_to :post_sub, 
        class_name: :PostSub, 
        foreign_key: :post_id

    has_many :posts, 
        through: :post_sub, 
        source: :posts
end
