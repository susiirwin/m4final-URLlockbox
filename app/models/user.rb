class User < ApplicationRecord
  has_secure_password
  validates_confirmation_of :password, message: "Passwords Must Match."
end
