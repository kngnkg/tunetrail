import nextJest from "next/jest.js"

// テスト実行前に環境変数を設定する
process.env.API_ROOT = "http://api.example.com"
process.env.MOCK_API_ROOT = "http://api.example.com"
process.env.GRPC_API_ROOT = "grpc://api.example.com"
process.env.NEXT_PUBLIC_API_ROOT = "http://api.example.com"
process.env.NEXT_PUBLIC_MOCK_API_ROOT = "http://api.example.com"
process.env.NEXT_PUBLIC_SPOTIFY_CDN_HOST = "http://cdn.example.com"
process.env.SPOTIFY_CLIENT_ID = "client_id"
process.env.SPOTIFY_CLIENT_SECRET = "client_secret"
process.env.NEXTAUTH_SECRET = "secret"
process.env.COGNITO_CLIENT_ID = "client_id"
process.env.COGNITO_CLIENT_SECRET = "client_secret"
process.env.COGNITO_ISSUER = "http://example.com"
process.env.COGNITO_DOMAIN = "example.com"
process.env.REDIS_HOST = "redis.example.com"
process.env.REDIS_PORT = "6379"
process.env.REDIS_PASSWORD = "password"

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
