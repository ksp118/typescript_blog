CREATE TABLE users (
  id BINARY(16) PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  nickname VARCHAR(30) NOT NULL,
  email VARCHAR(255) UNIQUE,
  email_verified BOOLEAN DEFAULT FALSE,
  role ENUM('reader', 'responder', 'writer', 'admin', 'banned') NOT NULL DEFAULT 'reader',
  status ENUM('active', 'dormant', 'suspended', 'deleted') DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME,
  dormant_at DATETIME
);
