class Api::UsersController < ApplicationController
  before_action :require_current_user, only: [:show, :delete]

    def show
        @user = User.find(params[:id])
        render 
    end

    def create
        @user = User.create(user_params)
        if @user.save
            log_in(@user)
            render :show
        else
            render @user.errors.full_messages
        end
        
    end


    private
    def user_params
        params.require(:user).permit(:username, :password)
    end
end
