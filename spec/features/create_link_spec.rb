require "rails_helper"

RSpec.describe "can create links", :js => :true do
  scenario "Create a new link" do
    visit "/"

    user = User.create(email: "email@email.com",
                    password: "password")

    visit '/'
    click_on "Login"
    expect(current_path).to eq(login_path)

    fill_in "email", with: "email@email.com"
    fill_in "password", with: "password"
    click_on "Submit"
    fill_in "Title:", :with => "Turing"
    fill_in "URL:", :with => "http://turing.io"
    click_on "Add Link"

    within('#links-list') do
      expect(page).to have_text("Turing")
      expect(page).to have_text("http://turing.io")
    end

  end
end
