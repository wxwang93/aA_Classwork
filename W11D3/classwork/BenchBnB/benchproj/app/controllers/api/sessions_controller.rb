class Api::SessionsController < ApplicationController
    
    
    def create
        @user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password])
        if @user
            log_in(@user)
            render :show
        else
          flash.now[:errors] = @users.errors.full_messages
          render :new
        end
    end

    def destroy
        @user = current_user
        if @user
            log_out
            render {}
        else
            render json: ["Nobody signed in"], status: 404
        end
    end
end
