/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
  },
  // Configuración adicional para producción
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001', 'localhost:80']
    }
  },
  // Asegurar que los assets se sirvan correctamente
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,
};

export default nextConfig; 