class GroupsController < ApplicationController
  before_action :set_group, only: %i[ show update destroy ]

  def index
    render json: { success: true, data: current_user.groups }
  end

  def show
    render json: { success: true, data: @group }, include: ['users']
  end

  def create
    @group = Group.new(group_params) do |g|
      g.has_started = false
      g.participations << Participation.new(
        user: current_user,
        present_status: 0,
        )
    end

    if @group.save
      render json: { success: true, data: @group }, status: :created, location: @group
    else
      render json: { success: false, message: @group.errors.full_messages.join('. ') }, status: :unprocessable_entity
    end
  end

  def update
    if @group.update(group_params)
      render json: { success: true, data: @group }, include: ['users']
    else
      render json: { success: false,  message: @group.errors.full_messages.join('. ') }, status: :unprocessable_entity
    end
  end

  def destroy
    @group.destroy
  end

  private

  def set_group
    @group = current_user.groups.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:title, :deadline)
  end
end
