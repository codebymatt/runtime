FactoryBot.define do
  factory :user, class: User do
    first_name  { Faker::Name.first_name }
    last_name   { Faker::Name.last_name }
    email       { Faker::Internet.unique.email }
    password    { Faker::Lorem.characters(12) }
  end
end