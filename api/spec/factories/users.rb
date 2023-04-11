# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    transient do
      num_groups { 4 }
    end

    email { Faker::Internet.email }
    password { Faker::Internet.password }

    trait :with_groups do
      after(:create) do |user, evaluator|
        create_list(:group, evaluator.num_groups).each do |group|
          create(:participation, group: group, user: user)
        end
      end
    end
  end
end
