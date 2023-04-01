class GroupsController < ApplicationController
  before_action :set_group, only: %i[ show update destroy ]

  def index
    render json: { success: true, data: current_user.groups }
  end

  def show
    render json: { success: true, data: @group }
  end

  def create
    @group = Group.new(group_params)
    @group.has_started = false

    if @group.save
      render json: { success: true, data: @group }, status: :created, location: @group
    else
      render json: { success: false, message: @group.errors.full_messages.join('. ') }, status: :unprocessable_entity
    end
  end

  def update
    if @group.update(group_params)
      render json: { success: true, data: @group }
    else
      render json: { success: false,  message: @group.errors.full_messages.join('. ') }, status: :unprocessable_entity
    end
  end

  def destroy
    @group.destroy
  end

  private
    def set_group
      @group = Group.find(params[:id])
    end

    def group_params
      params.require(:group).permit(:title, :deadline)
    end
end
