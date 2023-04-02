# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for(
    :users,
    path: '',
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }
  )

  resources :groups do
    member do
      post :assign_secret_sints
    end

    resources :participations, only: %i[update create destroy show]
  end
end
