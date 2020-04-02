class User < ApplicationRecord
  validates :username, uniqueness:true, presence:true
  validates :password_digest, presence:true
  
  after_initialize :ensure_session_token


  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end



  def reset_session_token!
    # change session token
    self.session_token = SecureRandom.urlsafe_base64

    # save to the db, loudly
    self.save!

    # return session_token
    self.session_token
  end




  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    password_digest_temp = BCrypt::Password.create(password)
    # result = self.find_by(password_digest: password_digest_temp)
    
    # result.length == 0 ? false : true
    password_digest_temp == self.password_digest
  end

  def self.find_by_credentials(username, password)
    user = self.find_by(username: username)
    if user && user.is_password?(password)
        user
    else
        nil
    end
  end

end
