# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  url        :string
#  content    :string
#  sub_id     :integer          not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    validates :title, presence: true, uniqueness: { scope: :sub_id, scope: :author_id }

    belongs_to :sub, 
        class_name: :Sub, 
        foreign_key: :sub_id

    belongs_to :author, 
        class_name: :User, 
        foreign_key: :author_id

    belongs_to :post_sub, 
        class_name: :PostSub, 
        foreign_key: :post_id

    has_many :subs, 
        through: :post_sub, 
        source: :subs
end
