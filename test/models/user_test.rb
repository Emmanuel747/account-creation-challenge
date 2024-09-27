require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save user without username" do
    user = User.new(password: '123')
    assert_not user.save
  end

  test "should not save user without password" do
    user = User.new(username: '123')
    assert_not user.save
  end

  # this test didn't match requirements 
  test "should save not user" do
    user = User.new(username: '123', password: '123')
    assert_not user.save
  end

  # Updated one here
  test "should save user" do
    user = User.new(username: 'validusername', password: 'validpassword1234567890!')
    assert user.save
  end

  test "should validate username" do
    assert_not User.validate_username('123456789'), "< 10"
    assert User.validate_username('1234567890'), ">= 10"
    assert User.validate_username('12345678901234567890123456789012345678901234567890'), "<= 50"
    assert_not User.validate_username('123456789012345678901234567890123456789012345678901'), "> 50"
  end

  test "should validate password" do
    assert_not User.validate_password('123456789012345678a'), "< 20"
    assert User.validate_password('1234567890123456789a'), ">= 20"
    assert User.validate_password('1234567890123456789012345678901234567890123456789a'), "<= 50"
    assert_not User.validate_password('123456789012345678901234567890123456789012345678901a'), "> 50"
  end

  test "password should include at least one letter and one number" do
    user = User.new(username: 'validusername', password: 'a' * 20)
    assert_not user.save, "Saved user with password containing only letters"
    assert_includes user.errors[:password], "must include at least one letter and one number"

    user = User.new(username: 'validusername', password: '1' * 20)
    assert_not user.save, "Saved user with password containing only numbers"
    assert_includes user.errors[:password], "must include at least one letter and one number"
  end

  test "password should pass strength check for medium strength" do
    user = User.new(username: 'validusername', password: 'Medium$trength2023Pass')
    assert user.save, "Could not save user with medium strength password"
  end

  test "password should pass strength check for strong password" do
    user = User.new(username: 'validusername', password: 'Str0ng&C0mpl3x!P@ssw0rd2023')
    assert user.save, "Could not save user with strong password"
  end

  test "should downcase username before saving" do
    user = User.create!(username: 'ValidUserName', password: 'validpassword1234567890')
    assert_equal 'validusername', user.reload.username, "Username was not downcased"
  end

  test "class method validate_username" do
    assert_not User.validate_username('short'), "Validated too short username"
    assert User.validate_username('validusername'), "Did not validate correct username"
    assert_not User.validate_username('a' * 51), "Validated too long username"
  end

  test "class method validate_password" do
    assert_not User.validate_password('short1'), "Validated too short password"
    assert User.validate_password('validpassword1234567890'), "Did not validate correct password"
    assert_not User.validate_password('a' * 51), "Validated too long password"
  end
end