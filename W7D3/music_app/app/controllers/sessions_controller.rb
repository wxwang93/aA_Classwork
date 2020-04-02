class SessionsController < ApplicationController
    def create
        user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password]
        )

        session[:session_token] = user.reset_session_token!

        if user.nil?
            flash.now[:errors] = ["Incorrect username and/or password"]
            render :new
        else
            login_user!(user)
            redirect_to users_url(url)
        end
    end

    def new
        render :new
    end

    def destroy
        logout_user!
        #redirect
    end
end
