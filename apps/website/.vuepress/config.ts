import { defineUserConfig } from 'vuepress';
import { webpackBundler } from '@vuepress/bundler-webpack';
import { ambrosiaTheme } from 'vuepress-theme-ambrosia';
// import { CATEGORIES } from '../../scripts/categories';

const CATEGORIES = [
    { id: 'base', text: '基底食材', icon: 'jar' },
    { id: 'base/stock-broth', text: '高汤/汤底' }, // 鸡汤, 蔬菜高汤, 牛肉高汤, 鱼高汤, 骨头汤, 蘑菇汤 等
    // { id: 'base/gough-batter', text: '面团/面糊' }, // 面包面团(白面包, 全麦面包, 酸面包), 糕点面团(派皮, 酥皮, 油酥), 面糊(煎饼, 华夫饼, 天妇罗) 等
    { id: 'base/sauce', text: '酱汁' }, // 母酱(白酱, 奶油酱, 番茄酱, 荷兰酱), 乳化酱(蛋黄酱), 油醋汁等
    { id: 'flavor_enhancer', text: '风味增强剂', icon: 'blender' },
    // { id: 'flavor_enhancer/spice', text: '香料混合物' }, // 咖喱粉, 辣椒粉, 普罗旺斯香草, 五香粉
    // { id: 'flavor_enhancer/rub-marinade', text: '腌料/擦料' }, // 干擦料, 湿腌料, 卤水
    { id: 'flavor_enhancer/fat', text: '油脂' }, // 浸渍油, 浸渍醋, 复合黄油等
    { id: 'flavor_enhancer/compound', text: '复合调料' }, // 风味糖浆 等
    { id: 'main', text: '核心食材', icon: 'steak' },
    { id: 'main/meat', text: '肉类' },
    { id: 'main/egg', text: '蛋类' },
    // { id: 'main/aquatic', text: '水产' },
    // { id: 'main/grain-starche', text: '谷物/淀粉' }, // 米饭, 面条, 燕麦, 土豆
    // { id: 'main/vegetable', text: '蔬菜' }, // 叶菜, 根菜, 花菜, 其他蔬菜
    { id: 'complementary', text: '配料', icon: 'salad' },
    { id: 'complementary/dressing', text: '配酱' }, // 肉汁, 油醋汁, 沙拉酱, 莎莎酱等
    // { id: 'complementary/topping-garnish', text: '装饰' }, // 芝麻, 坚果, 奶酪, 其他配菜
    { id: 'complementary/side', text: '配菜' }, // 蔬菜, 米饭, 面条, 燕麦, 土豆
    { id: 'finished', text: '成品菜', icon: 'pan-food' },
    { id: 'finished/stew-soup', text: '炖菜/汤' }, // 鸡肉面汤、牛肉炖菜、扁豆汤等
    // { id: 'finished/wheat', text: '面食' }, // 意大利面, 汤面, 饼干, 面包等
    { id: 'finished/salad', text: '沙拉' },
    { id: 'finished/main_course', text: '主菜' },
    // { id: 'finished/snacks', text: '小吃' },
    // { id: 'finished/desserts', text: '甜点' },
];

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
