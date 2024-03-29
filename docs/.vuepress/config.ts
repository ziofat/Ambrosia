import { defineUserConfig } from 'vuepress';
import path from 'path';
import { AmborsiaKitchenTheme } from '../../theme';
import { CATEGORIES } from '../../scripts/categories';

export default defineUserConfig<AmborsiaKitchenTheme>({
    lang: 'zh-CN',
    title: 'Ambrosia.Kitchen',
    description: '结构化的开源食谱',
    theme: path.resolve(__dirname, '../../theme/index.ts'),
    head: [
        ['script', {
            src: 'https://kit.fontawesome.com/f22e60e35c.js',
            crossorigin: 'anonymous',
        }],
    ],
    themeConfig: {
        navbar: [
            {
                text: '食谱',
                children: Object.values(CATEGORIES.reduce((acc, { id, text }) => {
                    const [main, sub] = id.split('/');
                    if (!sub) {
                        const original = acc[main] ?? { children: [] };
                        acc[main] = { ...original, text, link: `/recipes/${main}/` };
                    } else if (acc[main]) {
                        acc[main].children.push({ text, link: `/recipes/${main}/${sub}/` });
                    } else {
                        acc[main] = { text, link: `/recipes/${main}/`, children: [] };
                        acc[main].children.push({ text, link: `/recipes/${main}/${sub}/` });
                    }
                    return acc;
                }, {})),
            },
            {
                text: '技术指南',
                link: '/guides/basic/getting-started.html',
            },
            // {
            //     text: '速查手册',
            //     link: '/handbook/',
            // },
            {
                text: 'GitHub',
                link: 'https://github.com/ziofat/Ambrosia',
                icon: 'github',
            }
        ],
        sidebar: [
            {
                text: '基本',
                children: [
                    {
                        text: '介绍',
                        link: '/guides/basic/getting-started.html',
                    },
                    {
                        text: '使用电子秤',
                        link: '/guides/basic/scale.html',
                    },
                ],
                collapsible: false,
            },

        ],
        mainCategories: Object.values(CATEGORIES)
            .filter(({ id }) => !id.includes('/'))
            .map(({ id, text }) => ({ id, name: text })),
    },
});
