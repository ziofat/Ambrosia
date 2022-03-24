import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  title: 'Ambrosia.Kitchen',
  description: 'Well structured modernist recipes',
  theme: '@vuepress/theme-default',
  themeConfig: {
    navbar: [
      {
        text: 'Recipes',
        children: [
          {
            text: 'Basic',
            link: '/recipes/basic/',
          },
          {
            text: 'Soup',
            link: '/recipes/soup/',
          },
        ],
      },
      {
        text: 'How to',
        link: '/how-to/',
      },
      {
        text: 'Handbook',
        link: '/handbook/',
      }
    ],
  },
});
