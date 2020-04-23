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
        log_out
        render {}
    end
end
