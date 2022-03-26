import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import path from 'path';

export default defineUserConfig<DefaultThemeOptions>({
    lang: 'zh-CN',
    title: 'Ambrosia.Kitchen',
    description: '结构化的开源食谱',
    theme: path.resolve(__dirname, '../../theme/index.ts'),
    themeConfig: {
        navbar: [
            {
                text: '食谱',
                children: [
                    {
                        text: '基底',
                        link: '/recipes/basic/',
                        children: [
                            { text: '高汤', link: '/recipes/basic/stock/' },
                        ],
                    },
                    {
                        text: '汤品',
                        link: '/recipes/soup/',
                    },
                ],
            },
            {
                text: '技术指南',
                link: '/how-to/',
            },
            {
                text: '速查手册',
                link: '/handbook/',
            },
        ],
    },
});
