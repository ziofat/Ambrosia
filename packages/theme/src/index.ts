import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance';
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { getDirname, path } from '@vuepress/utils';

import { AmborsiaKitchenTheme } from './composables/theme-config';

const dirname = getDirname(import.meta.url);

export const ambrosiaTheme = (options: AmborsiaKitchenTheme) => {
    const onInitialized = (app) => {
        const docs = app.pages.filter((p) => p.data.path.startsWith('/recipes/'));
        const pageData = docs.map((p) => p.data);
        const content = `export const usePages = () => ${JSON.stringify(pageData)}`;
        app.writeTemp('pages.js', content);
    };

    return {
        name: 'vuepress-theme-ambrosia',
        plugins: [
            themeDataPlugin({ themeData: options }),
            mdEnhancePlugin({
                mark: true,
                mermaid: true,
            }),
        ],
        clientConfigFile: path.resolve(dirname, 'client.js'),
        onInitialized,
    };
};
