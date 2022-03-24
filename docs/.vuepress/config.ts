import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import path from 'path';

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  title: 'Ambrosia.Kitchen',
  description: 'Well structured modernist recipes',
  theme: path.resolve(__dirname, '../../theme/index.ts'),
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
