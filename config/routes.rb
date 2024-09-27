Rails.application.routes.draw do
  get 'home/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/', to: 'application#render_react', as: :root
  get 'signup/*all', to: 'application#render_react', as: :signup

  # New route for /create-account
  get 'create-account', to: 'application#render_react', as: :create_account

  namespace :api do
    post 'create-account', to: 'create_account#create'
  end
end