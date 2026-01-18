/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // <--- ESTO ES LA CLAVE MÁGICA
    images: {
        unoptimized: true, // Necesario para GitHub Pages
    },
    // Si vas a usar un subdominio como /yola, descomenta esto:
    // basePath: '/yola',
};

export default nextConfig;
