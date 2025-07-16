CREATE TABLE auth_local (
  user_id BINARY(16) PRIMARY KEY,
  hashed_password VARCHAR(255) NOT NULL, -- scrypt 해시값
  salt VARCHAR(255) NOT NULL,            -- scrypt 솔트값
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
