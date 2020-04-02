class User < ApplicationRecord
    validates :username, :session_token, presence: true, uniqueness: true 
    # validates :session_token, presence: true, uniqueness: true 
    validates :password_digest, presence: true 
    validates :password, length: { minimum: 6, allow_nil: true }
    before_validation :ensure_session_token

    attr_reader :password

    has_many :subs, 
        class_name: :Sub,
        foreign_key: :mod_id

    has_many :posts, 
        class_name: :Post 
        foreign_key: :author_id
    
    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end 

    def require_session_token! 
        self.session_token = SecureRandom.urlsafe_base64
        self.save!
        self.session_token
    end 

    def is_password?(password) 
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end 

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end 

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)

        return nil unless user

        user.is_password?(password) ? user : nil 
    end 
end
