class User < ApplicationRecord
  has_secure_password
  has_many :links
  validates :email, confirmation: true
  validates :email, uniqueness: true
  validates_confirmation_of :password, message: "Passwords Must Match."
end
