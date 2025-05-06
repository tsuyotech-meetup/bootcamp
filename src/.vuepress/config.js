import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'


export default defineUserConfig({
  lang: 'ja-JP',
  base: process.env.VUEPRESS_BASE || '/', 
  title: 'Bootcamp',
  description: 'ハンズオン資料集です。',


  theme: defaultTheme({
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
    ],
    docsBranch: 'main',
    docsDir: 'src',
    editLinkPattern: ':repo/blob/:branch/:path',
    repo: 'goegoe0212/bootcamp',
  }),

  plugins: [
    searchPlugin({
      // options
    }),
  ],

  bundler: viteBundler(),
})

