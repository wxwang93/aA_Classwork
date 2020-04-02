class UsersController < ApplicationController

    def new
        @user = User.new
        render :new
    end

    def show
        debugger
        @user = User.find(params[:id])
        render :show
    end

    def create
        @user = User.new(user_params)

        if @user.save
            debugger
            redirect_to user_url(@user.id)
        else
            debugger
            redirect_to new_user_url
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :password_digest, :session_token, :password)
    end
end
