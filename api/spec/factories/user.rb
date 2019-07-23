FactoryBot.define do
  factory :user, class: User do
    name  { Faker::Name.name }
    email { Faker::Internet.unique.email }
    password { Faker::Lorem.characters(12) }
  end
end