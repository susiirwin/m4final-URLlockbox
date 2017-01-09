class LinksController < ApplicationController
  def index
    @hot_links = Link.hot
    
  end

  def create
    @link = Link.create(link_params)
    if @link.persisted?
      current_user.links << @link
      redirect_to root_path
    else
      flash[:notice] = "Your Link is Invalid"
      redirect_to root_path
    end
  end

  def edit
    @link = Link.find(params[:id])
  end

  def update
    @link = Link.find(params[:id])
    if @link.update_attributes(link_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private
  def link_params
    params.require(:link).permit(:title, :url)
  end
end
