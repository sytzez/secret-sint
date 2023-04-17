# frozen_string_literal: true

FactoryBot.define do
  factory :group do
    transient do
      num_participants { 4 }
      participation_traits { [] }
    end

    title { Faker::FunnyName.name }
    has_started { false }

    trait :with_participants do
      after(:create) do |group, evaluator|
        create_list(
          :participation,
          evaluator.num_participants,
          *evaluator.participation_traits,
          group:
        )
      end
    end

    trait :with_wishlists do
      transient do
        participation_traits { [:with_wishlist] }
      end
    end

    trait :with_ordered_presents do
      transient do
        participation_traits { %i[with_wishlist with_ordered_present] }
      end
    end

    trait :with_delivered_presents do
      transient do
        participation_traits { %i[with_wishlist with_delivered_present] }
      end
    end
  end
end
