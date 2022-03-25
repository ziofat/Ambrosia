import { path } from '@vuepress/utils';

const ambrosiaTheme = {
    name: 'vuepress-theme-ambrosia',
    layouts: {
        Layout: path.resolve(__dirname, 'layouts/layout.vue'),
        404: path.resolve(__dirname, 'layouts/404.vue'),
    },
};

export default ambrosiaTheme;
