import { path } from '@vuepress/utils';

export const ambrosiaTheme = (
    { themePlugins = {}, ...localeOptions },
    app,
) => ({
    name: 'vuepress-theme-ambrosia',
    layouts: {
        Layout: path.resolve(__dirname, 'layouts/layout.vue'),
        404: path.resolve(__dirname, 'layouts/404.vue'),
    },
    plugins: [
        ['@vuepress/theme-data', { themeData: localeOptions }],
    ],
});

export default ambrosiaTheme;
