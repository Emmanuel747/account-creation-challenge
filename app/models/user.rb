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
      # we shouldn't display to end user though
      errors.add :password, "is not strong enough (strength: #{strength}/4)"
    end
  end

  private

  # prevents duplicate usernames with different cases
  def downcase_username
    self.username = username.downcase
  end
end