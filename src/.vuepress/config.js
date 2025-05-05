import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',
  base: '/bootcamp/',
  title: 'Bootcamp',
  description: 'Bootcamp Site',

  theme: defaultTheme({
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
    ],
  }),

  bundler: viteBundler(),
})

