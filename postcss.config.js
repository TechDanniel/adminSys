// @ts-check
import purgeCSSPlugin from '@fullhuman/postcss-purgecss'

/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    purgeCSSPlugin({
      // 指定需要分析的文件，PurgeCSS 会从这些文件中查找使用到的 CSS 类名等
      content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.js']
    })
  ]
}
