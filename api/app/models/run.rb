class Run < ApplicationRecord
  belongs_to :user

  before_validation :set_date, if: :new_record?

  validates :distance, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :time, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validate :date_is_not_in_the_future
  validates_presence_of :user_id

  def pace
    (distance.to_f / time).round(2)
  end

  def serialized_data
    {
      id: id,
      distance: distance,
      seconds: time,
      pace: pace,
      date: date.to_date
    }
  end

  private

  def set_date
    self.date = Time.now.utc unless date.present?
  end

  def date_is_not_in_the_future
    errors.add(:date, "can't be in the future") if date.nil? || date.to_date > Date.today
  end
end