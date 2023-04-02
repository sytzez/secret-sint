# frozen_string_literal: true

require 'test_helper'

class GroupsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @group = groups(:one)
  end

  test 'should get index' do
    get groups_url, as: :json
    assert_response :success
  end

  test 'should create group' do
    assert_difference('Group.count') do
      params = { group: { deadline: @group.deadline, has_started: @group.has_started, title: @group.title } }
      post groups_url, params: params, as: :json
    end

    assert_response :created
  end

  test 'should show group' do
    get group_url(@group), as: :json
    assert_response :success
  end

  test 'should update group' do
    params = { group: { deadline: @group.deadline, has_started: @group.has_started, title: @group.title } }
    patch group_url(@group), params: params, as: :json
    assert_response :success
  end

  test 'should destroy group' do
    assert_difference('Group.count', -1) do
      delete group_url(@group), as: :json
    end

    assert_response :no_content
  end
end
