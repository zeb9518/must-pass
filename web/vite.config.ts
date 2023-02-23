import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// 引入文件

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  // 本地反向代理解决浏览器跨域限制
  server: {
    host: "0.0.0.0",
    port: 5173,
    open: false, // 运行自动打开浏览器
    proxy: {
      "/api": {
        target: "http://localhost:9910/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
