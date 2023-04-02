# frozen_string_literal: true

class GroupsController < ApplicationController
  before_action :set_group, only: %i[show update destroy assign_secret_sints]

  def index
    render json: { success: true, data: current_user.groups }
  end

  def show
    render json: { success: true, data: @group },
           include: %i[users],
           methods: %i[wishlist_count ordered_count delivered_count]
  end

  def create
    @group = Group.new(group_params) do |g|
      g.has_started = false
      g.participations << Participation.new(
        user: current_user,
        present_status: :not_started
      )
    end

    if @group.save
      render json: { success: true, data: @group },
             status: :created
    else
      render json: { success: false, message: @group.errors.full_messages.join('. ') }, status: :unprocessable_entity
    end
  end

  def update
    if @group.update(group_params)
      render json: { success: true, data: @group }
    else
      render json: { success: false, message: @group.errors.full_messages.join('. ') }, status: :unprocessable_entity
    end
  end

  def destroy
    @group.destroy
  end

  def assign_secret_sints
    service = AssignSecretSintsService.new(@group)
    service.validate!
    service.call
    render json: { success: true }
  rescue AssignSecretSintsError => e
    render json: { success: false, message: e.message }, status: :unprocessable_entity
  end

  private

  def set_group
    @group = current_user.groups.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:title, :deadline)
  end
end
