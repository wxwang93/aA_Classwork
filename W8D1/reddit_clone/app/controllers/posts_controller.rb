class PostsController < ApplicationController
    before_action :require_author, only: [:edit, :update]

    def edit
        @post = Post.find_by(id: params[:id])
        render :edit 
    end 

    def update
        @post = Post.find_by(id: params[:id])

        if @post.update 
            redirect_to post_url(@post)
        else 
            flash[:errors] = @post.errors.full_messages 
            render :edit
        end 
    end 
    
    def create
        @post = Post.new(post_params)
        if @post.save
            redirect_to sub_url(params[:sub_id])
        else
            flash[:errors] = @post.errors.full_messages
            render :new
        end
    end 

    def new
        @post = Post.new
        render :new
    end

    private

    def require_author 
        redirect_to post_url(params[:id]) unless current_user.id == params[:author_id].to_i
    end 

    def post_params
        params.require(:post).permit(:title, :url, :content, :sub_id)
    end
end
