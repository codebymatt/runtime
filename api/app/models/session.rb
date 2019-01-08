class Session < ApplicationRecord
  has_secure_token
  belongs_to :user
  validates :user_id, presence: true, uniqueness: true
  attr_readonly :token
  before_create :assign_expiry_date

  private

  def assign_expiry_date
    self.expiry_date = DateTime.now + 7.days
  end
end