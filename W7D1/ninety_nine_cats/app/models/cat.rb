# == Schema Information
#
# Table name: cats
#
#  id          :bigint           not null, primary key
#  birth_date  :date             not null
#  color       :string           not null
#  name        :string           not null
#  sex         :string(1)        not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Cat < ApplicationRecord
    COLORS = ['red', 'yellow', 'blue']
    GENDERS = ['M', 'F', 'X']

    require 'action_view'
    validates :color, inclusion: { in: COLORS, message: "color must be in COLORS constant" }
    validates :sex, inclusion: { in: GENDERS, message: "gender must be in GENDERS constant" }
    validates :birth_date, :color, :name, :sex, :description, presence: true

    def age
        (Date.today.mjd - self.birth_date.to_date.mjd)/365
    end

    def all_colors
        COLORS
    end

end
