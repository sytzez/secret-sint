# frozen_string_literal: true

class ParticipationsController < ApplicationController
  before_action :set_group
  before_action :set_participation, only: %i[show update destroy]
  before_action :set_invited_user, only: %i[create]

  def show
    if @participation.user == current_user
      render json: { success: true, data: @participation }
    elsif @participation.sint == current_user
      render json: { success: true, data: @participation.as_json(except: %i[present_status], include: %i[user]) }
    else
      render json: { success: false, message: "Can't view other participant's details" }, status: :forbidden
    end
  end

  def create
    @participation = @group.invite!(@invited_user)
    render json: { success: true, data: @participation }, status: :created, location: [@group, @participation]
  end

  def update
    if @participation.user != current_user
      render json: { success: false, message: "Can't update other participant's details" }, status: :forbidden
      return
    end

    if @participation.update(own_participation_params)
      render json: { success: true }
    else
      render json: { success: false, message: @participation.errors.full_messages.join('. ') },
             status: :unprocessable_entity
    end
  end

  def destroy
    if @participation.user != current_user
      render json: { success: false, message: "Can't remove another participant from a group" }, status: :forbidden
      return
    end

    @participation.destroy
  end

  private

  def set_group
    @group = current_user.groups.find(params[:group_id])
  end

  def set_participation
    @participation = if params[:id] == 'own'
                       @group.participations.find_by!(user_id: current_user.id)
                     elsif params[:id] == 'assigned'
                       @group.participations.find_by!(sint_id: current_user.id)
                     else
                       @group.participations.find(params[:id])
                     end
  end

  def set_invited_user
    @invited_user = User.find_by!(email: invitation_params[:email])
  rescue ActiveRecord::RecordNotFound
    raise InvitationError, "This user doesn't have an account in the app"
  end

  def own_participation_params
    if @group.has_started
      params.require(:participation).permit(:present_status, :eta)
    else
      params.require(:participation).permit(:wishlist)
    end
  end

  def invitation_params
    params.require(:participation).permit(:email)
  end
end
