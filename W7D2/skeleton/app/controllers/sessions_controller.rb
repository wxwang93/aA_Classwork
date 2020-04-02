class SessionsController < ApplicationController
  def new
    #render session_url
  end

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    render cats_url
  end
end