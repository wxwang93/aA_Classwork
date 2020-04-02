require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  subject(:user) { FactoryBot.create(:user) }
  
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:password_digest) }
  # it { should validate_presence_of(:session_token) }
  it { should validate_length_of(:password).is_at_least(6) }
  
  it { should validate_uniqueness_of(:username) }
  it { should validate_uniqueness_of(:session_token) }
  
  it { should have_many(:goals) }
  it { should have_many(:comments) }

  describe 'ensure_session_token_is_present' do
    it 'assigns a session token if none is given' do
      expect(FactoryBot.create(:user).session_token).to_not be_nil
    end
  end

end
