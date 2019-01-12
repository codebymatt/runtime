class User < ApplicationRecord
  has_secure_password
  has_one :session, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, maximum: 72 }

  validates_format_of :email, with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

  after_create :create_session

  def self.with_session_token(token)
    joins(:session).where("sessions.token = ? AND sessions.expiry_date > ? ", token, Time.now).first
  end

  private

  def create_session
    Session.create(user: self)
  end
end