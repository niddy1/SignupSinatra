class WelcomeController < ApplicationController
  #configs for all my view based routing

  get '/' do
    erb :index
  end
end
