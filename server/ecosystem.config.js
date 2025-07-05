module.exports = {
  apps: [
    {
      name: "blog-backend",
      script: "/srv/blog-backend/server.js", // 트랜스파일된 JS 엔트리 포인트
      cwd: "/srv/blog-backend", // 현재 디렉토리 기준

      watch: false,
      exec_mode: "cluster", // 여러 CPU 코어 활용
      instances: "max", // 가능한 모든 코어 사용

      max_memory_restart: "300M",
      listen_timeout: 8000,
      graceful_timeout: 8000,

      ignore_watch: ["node_modules", "logs"],

      env: {
        NODE_ENV: "production",
      },

      output: "/srv/blog-backend/logs/pm2/console.log", // 로그 경로 (절대경로로 수정)
      error: "/srv/blog-backend/logs/pm2/consoleError.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
