class AssignSecretSintsService
  def initialize(group)
    @group = group
  end

  def validate!
    invalid! "Secret Sint's have already been assigned" if @group.has_started?
    invalid! "The group must have at least 3 participants" if @group.participations.count < 3
    invalid! "Not everyone has filled in their wishlist" if @group.wishlist_count < @group.participations.count
  end

  def call
    ActiveRecord::Base.transaction do
      user_ids = @group.participations.pluck(:user_id)

      @group.participations.each do |participation|
        assigned_user_id = user_ids.reject{ |id| id == participation.user_id }.sample

        participation.update!(assigned_user_id: assigned_user_id)

        user_ids.delete(assigned_user_id)
      end

      @group.update!(has_started: true)
    end
  end

  private

  def invalid!(message)
    raise AssignSecretSintsError.new(message)
  end
end
