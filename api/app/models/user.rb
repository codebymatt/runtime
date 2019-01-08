class User < ApplicationRecord
  has_secure_password
  has_one :session, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, maximum: 72 }

  validates_format_of :email, with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
end