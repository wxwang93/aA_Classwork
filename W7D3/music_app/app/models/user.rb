class User < ApplicationRecord
    validates :email, presence:true, uniqueness: true
    validates :password_digest, presence:true
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: {minimum: 6}
    attr_reader :password
    after_initialize :ensure_session_token

    def self.generate_session_token
        SecureRandom.urlsafe_base64
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.session_token = User.generate_session_token

        self.save!

        return self.session_token
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

     def is_password?(password)
        self == BCrypt::Password.create(password)
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user

        password_obj = BCrypt::Password.new(user.password_digest)
        pw_obj.is_password?(password) ? user : nil
    end


end
