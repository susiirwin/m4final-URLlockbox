require "rails_helper"

RSpec.describe "can create login account", :js => :true do
  scenario "allow visitor to create an account and log in" do
    visit "/"

    click_on "Create Account"
    expect(current_path).to eq(signup_path)

    fill_in "user_email", with: "email@email.com"
    fill_in "user_password", with: "password"
    fill_in "user_password_confirmation", with: "password"

    click_on "Submit"

    expect(current_path).to eq('/')
    expect(page).to have_content("Logout")
    expect(page).to have_content("email@email.com")
    expect(page).to_not have_content("Create Account")

  end
end
