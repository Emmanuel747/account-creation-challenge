require 'zxcvbn'

# better to move more logic to the user model 
class User < ApplicationRecord
  validates :username, presence: true, 
             length: { minimum: 10, maximum: 50 }, 
             uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 20, maximum: 50 }
  
  validate :password_complexity
  validate :password_strength

  before_save :downcase_username

  def password_complexity
    return if password.blank?
    unless password.match?(/^(?=.*[A-Za-z])(?=.*\d)/)
      errors.add :password, "must include at least one letter and one number"
    end
  end

  def password_strength
    return if password.blank?
    strength = Zxcvbn.test(password).score
    if strength < 2
      # we shouldn't display this to the end user though
      errors.add :password, "is not strong enough (strength: #{strength}/4)"
    end
  end

  # Class method to validate username
  def self.validate_username(username)
    username.length >= 10 && username.length <= 50
  end

  # Class method to validate password
  def self.validate_password(password)
    password.length >= 20 && password.length <= 50
  end

  private

  # prevents duplicate usernames with different cases
  def downcase_username
    self.username = username.downcase
  end
end