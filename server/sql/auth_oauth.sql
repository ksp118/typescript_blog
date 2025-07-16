CREATE TABLE auth_oauth (
  user_id BINARY(16) NOT NULL,
  provider VARCHAR(20) NOT NULL,              -- 예: 'github', 'google'
  provider_user_id VARCHAR(128) NOT NULL,     -- GitHub의 경우 GitHub ID
  access_token TEXT NOT NULL,                 -- 필요 시 암호화 고려
  refresh_token TEXT,                         -- 옵션
  token_expires_at DATETIME,                  -- access_token 유효 시간
  profile_data JSON,                          -- ex: { "avatar_url": "...", "name": "..." }
  connected_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (provider, provider_user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
