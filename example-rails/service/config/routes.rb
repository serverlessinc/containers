Rails.application.routes.draw do
  get '/health', to: 'health#check'
  root 'health#info'
end
