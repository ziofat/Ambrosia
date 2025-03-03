import { defineUserConfig } from 'vuepress';
import { webpackBundler } from '@vuepress/bundler-webpack';
import { ambrosiaTheme } from 'vuepress-theme-ambrosia';
import { CATEGORIES } from './categories';

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'Ambrosia.Kitchen',
    description: '结构化的开源食谱',
    bundler: webpackBundler({
        postcss: {},
        vue: {},
    }),
    theme: ambrosiaTheme({
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
                            text: 'Ambrosia 语法',
                            link: '/guides/basic/ambrosia-lang.html',
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
                {
                    text: '常用食材',
                    link: '/handbook/pantry-staples.html',
                },
            ],
        },
        categories: CATEGORIES,
    }),
    head: [
        ['script', {
            src: 'https://kit.fontawesome.com/f22e60e35c.js',
            crossorigin: 'anonymous',
        }],
    ],
    markdown: {
        code: {
            lineNumbers: false,
        },
        anchor: false,
    },
});
