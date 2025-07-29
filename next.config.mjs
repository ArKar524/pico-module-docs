/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // ✅ export as static HTML (Next.js 13+)
  trailingSlash: true, // ✅ optional: makes /docs/ work cleanly
};

export default nextConfig;
