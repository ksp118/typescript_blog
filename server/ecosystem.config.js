module.exports = {
  apps: [
    {
      name: "blog-backend",
      script: "./dist/server.js",       // 트랜스파일된 JS 엔트리 포인트
      cwd: ".",                          // 현재 디렉토리 기준
      watch: true,
      ignore_watch: [
        "node_modules"
      ],
      exec_mode: "cluster",             // 여러 CPU 코어 활용
      instances: "max",                 // 가능한 모든 코어 사용
      env: {
        NODE_ENV: "production"
      },
      output: "/home/ksp118/logs/pm2/console.log",        // 로그 경로 (절대경로로 수정)
      error: "/home/ksp118/logs/pm2/consoleError.log"
    }
  ]
};