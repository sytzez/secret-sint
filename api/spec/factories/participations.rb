# frozen_string_literal: true

FactoryBot.define do
  factory :participation do
    wishlist { nil }
    present_status { :not_started }

    association :user

    trait :with_wishlist do
      wishlist { Faker::Lorem.sentences.join("\n") }
    end

    trait :with_ordered_present do
      present_status { :ordered }
    end

    trait :with_delivered_present do
      present_status { :delivered }
    end
  end
end
