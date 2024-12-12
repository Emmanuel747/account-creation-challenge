class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def render_react
    react
  end

  private

  def react
    render layout: 'application', template: 'vite/index'
  end

  def route_not_found
    render json: { error: 'Route not found' }, status: :not_found
  end
end