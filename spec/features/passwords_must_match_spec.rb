require 'rails_helper'

RSpec.describe "passwords matching", :js => :true do
  scenario "allows signup with matching password" do
    visit '/'
    click_on "Create Account"
    expect(current_path).to eq(signup_path)

    fill_in "user_email", with: "email@email.com"
    fill_in "user_password", with: "password"
    fill_in "user_password_confirmation", with: "password"

    click_on "Submit"

    expect(current_path).to eq('/')
    expect(page).to have_content("Logout")
  end
end
