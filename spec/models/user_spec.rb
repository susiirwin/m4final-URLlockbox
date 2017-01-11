require 'rails_helper'

RSpec.describe User, type: :model do
  context "validations" do
    it { is_expected.to have_secure_password }
    it { is_expected.to validate_uniqueness_of(:email)}
    it { should have_many(:links) }
    it { should validate_confirmation_of(:password)}
    it { is_expected.to validate_presence_of(:password)}
  end
end
