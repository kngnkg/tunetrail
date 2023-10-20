import { env } from "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [env.NEXT_PUBLIC_SPOTIFY_CDN_HOST],
  },
}

export default nextConfig
