class Api::V1::LinksController < ApplicationController
  before_filter :current_user

  def create
    @link = current_user.links.new(link_params)
    if @link.save
      render json: @link, status: 201
    else
      render json: @link.errors.full_messages, status: 500
    end
  end

  def index
    links = current_user.links
    render json: links, status: 201
  end

  def edit
    @link = Link.find(params[:id])
  end

  def update
    @link = Link.find params[:id]
    @link.assign_attributes(link_params)
    just_read = @link.read_changed? && @link.read
    if @link.save
      Read.create(link: @link) if just_read
      head :no_content
    else
      render json: @link.errors.full_messages, status: 500
    end
  end


  private

  def link_params
    params.permit(:title, :url, :read)
  end
end
