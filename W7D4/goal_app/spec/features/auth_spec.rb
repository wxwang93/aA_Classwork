require 'spec_helper'
require 'rails_helper'





feature 'the signup process' do
    scenario 'has a new user page' do
        visit new_user_url
        expect(page).to have_content('Sign-up')
    end
    
    feature 'signing up a user' do
        scenario 'redirects to user\'s show and displays username on success' do
            visit new_user_url
            user = FactoryBot.build(:user)
            fill_in 'Username', with: user.username
            fill_in 'Password', with: user.password
            click_button 'Submit'
            # save_and_open_page
            expect(current_url).to eq(user_url(user.id))
            expect(page).to have_content(user.username) 
        end  

    end
end

feature 'logging in' do
  scenario 'shows username on the homepage after login'

end

feature 'logging out' do
  scenario 'begins with a logged out state'

  scenario 'doesn\'t show username on the homepage after logout'

end