FactoryBot.define do
  factory :user do
    # username {Faker::Games::Fallout.character}
    username { 'maybebaby' }
    password { 'password' }
  end
end
