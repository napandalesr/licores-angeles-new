import type { NextConfig } from "next";
import withTmInitializer from "next-transpile-modules";

const withTM = withTmInitializer([
  'rc-util',
  'rc-picker',
  'rc-input',
  'rc-tree',
  'rc-table',
  '@ant-design/icons',
  '@ant-design/icons-svg',
  'rc-pagination',
  'antd'
]);

const nextConfig: NextConfig = withTM({
  /* config options here */
  reactStrictMode: true,
});

export default nextConfig;
