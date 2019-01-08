FactoryBot.define do
  factory :session, class: :Session do
    user_id { user }
  end
end