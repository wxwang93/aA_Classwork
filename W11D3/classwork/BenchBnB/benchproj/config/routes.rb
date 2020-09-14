Rails.application.routes.draw do
  get 'benches/index'
  get 'benches/create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :benches, only: [:index, :show, :create]
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
  end
  root to: 'static_pages#root'
end
