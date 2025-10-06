/** @type {import('next').NextConfig} */
const nextConfig = {
    // 🏆 REQUIRED FOR NEXT/IMAGE
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '5000', // Match your backend port
          pathname: '/uploads/country_files/**', // Allow images from this specific path
        },
      ],
      // OR, for a simpler, but less secure configuration (if the above fails):
      domains: ['localhost'],
    },
  };
  
  export default nextConfig;