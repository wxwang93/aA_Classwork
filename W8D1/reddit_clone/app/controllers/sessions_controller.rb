class SessionsController < ApplicationController
    def new # render :new  
    end

    def create
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
        if @user
            log_in!(@user)
            redirect_to users_url
        else
            flash.now[:errors] = ["Invalid username or password"]
            render :new
        end
    end

    def destroy
        log_out!
        redirect_to users_url
    end
end
