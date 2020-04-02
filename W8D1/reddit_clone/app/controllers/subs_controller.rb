class SubsController < ApplicationController
    before_action :require_mod, only: [:edit, :update, :destroy]

    def new
    end 

    def edit
        @sub = Sub.find_by(id: params[:id]) # Just so the form is pre-filled with the sub's information. 
        render :edit
    end 

    def index
    end

    def create 
    end 

    def update 
        @sub = Sub.find_by(id: params[:id]) # Completely new request response cycle, so the @user from edit will be lost. 

        if @sub.update(sub_params)
            redirect_to sub_url(@sub)
        else
            flash[:errors] = @sub.errors.full_messages
            redirect_to edit_sub_url(@sub)
        end
    end 

    def show 
    end 

    def destroy 
    end 

    private
    def sub_params
        params.require(:sub).permit(:title, :description)
    end

    def require_mod 
        # check if we are logged_in?
        # make sure that the current user's id equals the subs mod_id
        redirect_to users_url unless current_user.id == params[:mod_id].to_i
    end 
end

