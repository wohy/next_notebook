import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin"
const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['avatars.githubusercontent.com'], // 配置允许的主机名
  }
};

export default withNextIntl(nextConfig);
