import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./styles'], // Указываем путь, если у вас есть общие SCSS-файлы
  },
};

export default nextConfig;
