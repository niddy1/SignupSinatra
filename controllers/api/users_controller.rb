class UsersController < ApiController

  get '/' do
    users = User.all
    content_type :json
    users.to_json
  end

  post '/' do
    content_type :json
    user = User.create(user_params)
    user.to_json
    # redirect '/'
  end

  delete '/:id' do

    User.delete(params[:id])

  end
  def user_params
    #if params from from, OR  from backbone
    #in this case
    params[:user] || JSON.parse(request.body.read)
  end

end
