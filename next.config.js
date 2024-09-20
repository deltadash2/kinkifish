/** @type {import('next').NextConfig} */
const allowedImageWordPressDomain = new URL(
  process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL
).hostname;
const nextConfig = {
  images: {
    domains: [
      allowedImageWordPressDomain,
      "via.placeholder.com",
      "secure.gravatar.com",
    ],
  },
};

module.exports = nextConfig;
