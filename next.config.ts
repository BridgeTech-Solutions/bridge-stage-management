import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Nous augmentons la limite à 10 Mo pour permettre 
      // l'upload des CV et lettres de motivation (PDF)
      bodySizeLimit: "5mb", 
    },
  },
};

export default nextConfig;