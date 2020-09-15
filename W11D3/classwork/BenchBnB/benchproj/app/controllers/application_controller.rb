class ApplicationController < ActionController::Base

    helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def log_in(user)
    user.reset_session_token
    session[:session_token] = user.session_token
    @current_user = user
  end

  def log_out
    @user.reset_session_token
    session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

  def require_current_user
    redirect_to new_session_url unless current_user
  end
  
end
