import { path } from '@vuepress/utils';

export const ambrosiaTheme = (
    { themePlugins = {}, ...localeOptions },
    app,
) => {
    const onInitialized = () => {
        const docs = app.pages.filter((p) => p.data.path.startsWith('/recipes/'));
        const pageData = docs.map((p) => p.data);
        const content = `export const usePages = () => ${JSON.stringify(pageData)}`;
        app.writeTemp('pages.js', content);
    };

    return {
        name: 'vuepress-theme-ambrosia',
        layouts: {
            Layout: path.resolve(__dirname, 'layouts/layout.vue'),
            404: path.resolve(__dirname, 'layouts/404.vue'),
        },
        plugins: [
            ['@vuepress/theme-data', { themeData: localeOptions }],
        ],
        onInitialized,
    };
};

export default ambrosiaTheme;
