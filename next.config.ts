import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config: WebpackConfig) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'], // 여기서 외부 도메인 허용
  }, //이미지 업로드 미리보기용 외부도메인 추가
};

export default nextConfig;
