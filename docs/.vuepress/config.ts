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
            {
                text: '速查手册',
                link: '/handbook/meat-cooking-temperature.html',
            },
            {
                text: 'GitHub',
                link: 'https://github.com/ziofat/Ambrosia',
                icon: 'github',
            },
        ],
        sidebar: {
            guides: [
                {
                    text: '基本',
                    children: [
                        {
                            text: '介绍',
                            link: '/guides/basic/getting-started.html',
                        },
                        {
                            text: 'Cooklang 语法扩展',
                            link: '/guides/basic/cooklang.html',
                        },
                        {
                            text: '使用电子秤',
                            link: '/guides/basic/scale.html',
                        },
                    ],
                    collapsible: false,
                },
                {
                    text: '传统技法',
                    children: [
                        {
                            text: '烧',
                            link: '/guides/technique/covered-saute.html',
                        },
                    ],
                    collapsible: false,
                },
            ],
            handbook: [
                {
                    text: '肉类熟度与中心温度',
                    link: '/handbook/meat-cooking-temperature.html',
                },
            ],
        },
        mainCategories: Object.values(CATEGORIES)
            .filter(({ id }) => !id.includes('/'))
            .map(({ id, text, icon }) => ({ id, name: text, icon })),
    },
    markdown: {
        code: {
            lineNumbers: false,
        },
    },
    plugins: [
        ['md-enhance', { mark: true }],
    ],
});
