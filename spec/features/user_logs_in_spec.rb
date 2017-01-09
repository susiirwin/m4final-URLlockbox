require "rails_helper"

RSpec.describe "can create login account", :js => :true do
  scenario "allow visitor to create an account and log in" do
    user = User.create(email: "email@email.com",
                    password: "password")

    visit '/'
    click_on "Login"
    expect(current_path).to eq(login_path)

    fill_in "email", with: "email@email.com"
    fill_in "password", with: "password"
    click_on "Submit"

    expect(current_path).to eq('/')
    expect(page).to have_content("Logout")

  end

  scenario "allows a registered user to Log Out of the Site" do
    user = User.create(email: "email@email.com",
                    password: "password")

    visit '/'
    click_on "Login"
    expect(current_path).to eq(login_path)

    fill_in "email", with: user.email
    fill_in "password", with: user.password
    click_on "Submit"

    expect(current_path).to eq('/')
    expect(page).to have_content("Logout")

    click_on "Logout"
    expect(page).to have_content("Login")
    expect(page).to have_content("Create Account")
  end

end
