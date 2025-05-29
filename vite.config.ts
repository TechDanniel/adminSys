import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tsconfigPaths from 'vite-tsconfig-paths'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'
import svgLoader from 'vite-svg-loader'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
//import { Plugin as importToCDN } from "vite-plugin-cdn-import";

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()]
    }
  },
  build: {
    rollupOptions: {
      //external:['vue','vue-router','axios','dayjs','echarts','analyzeRef.cjs'],
      output: {
        chunkFileNames: 'js/[name]-[hash].js', //引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', //包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]' //资源文件（字体图片等）名称
      },
      plugins: [
        visualizer({
          filename: 'stats.json', // 指定生成 JSON 报告文件
          json: true // 生成 JSON 格式的报告
        })
      ]
    },
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        // 删除所有的console语句
        drop_console: true,
        // 删除所有的debugger语句
        drop_debugger: true
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    tsconfigPaths(),
    vitePluginFakeServer({
      logger: false,
      include: 'mock',
      infixName: false,
      enableProd: true
    }),
    svgLoader()
    // process.env.NODE_ENV==='production'?importToCDN({
    //   prodUrl: "https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}",
    //   modules:[
    //     {
    //       name: "vue",
    //       var: "Vue",
    //       path: "vue.global.prod.min.js"
    //     },
    //     {
    //       name: "vue-router",
    //       var: "VueRouter",
    //       path: "vue-router.global.min.js"
    //     },
    //     {
    //       name: "axios",
    //       var: "axios",
    //       path: "axios.min.js"
    //     },
    //     {
    //       name: "dayjs",
    //       var: "dayjs",
    //       path: "dayjs.min.js"
    //     },
    //     {
    //       name: "echarts",
    //       var: "echarts",
    //       path: "echarts.min.js"
    //     }
    //   ]
    // }):null
  ]
})
