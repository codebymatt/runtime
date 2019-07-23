FactoryBot.define do
  factory :run, class: Run do
    distance { Random.rand(1000..100_000) }
    time { Random.rand(500..50_000) }
    user
  end
end