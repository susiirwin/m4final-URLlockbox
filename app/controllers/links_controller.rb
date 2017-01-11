class LinksController < ApplicationController

  def edit
    @link = Link.find(params[:id])
  end

  def update
    @link = Link.find(params[:id])
    if @link.update_attributes(link_params)
      redirect_to root_path
    else
      flash[:notice] = "That is an invalid URL."
      render :edit

    end
  end

  private
  def link_params
    params.require(:link).permit(:title, :url)
  end
end
