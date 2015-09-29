require 'bundler'
Bundler.require


#controllers
require './controllers/application_controller'
require './controllers/welcome_controller'
require './controllers/api/api_controller'
require './controllers/api/users_controller'
# require './controllers/sessions.rb'

# require './controllers/api/todos.rb'


#models
require './models/user.rb'

#routes
map ('/api/users'){run UsersController}
map ('/'){run WelcomeController}
