import { defineClientConfig } from '@vuepress/client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { defineMermaidConfig } from 'vuepress-plugin-md-enhance/client';
import Step from './components/step.vue';
import Steps from './components/steps.vue';
import Instruction from './components/instruction.vue';

import './styles/index.scss';

import Layout from './layouts/layout.vue';
import NotFound from './layouts/404.vue';

defineMermaidConfig({
    securityLevel: 'loose',
    theme: 'base',
    themeVariables: {
        primaryColor: 'transparent',
        primaryTextColor: '#ECEFF4',
        primaryBorderColor: '#D8DEE9',
        lineColor: '#D08770',
        secondaryColor: '#EBCB8B',
        tertiaryColor: '#A3BE8C',
    },
});

export default defineClientConfig({
    layouts: {
        Layout,
        NotFound,
    },
    enhance({ app }) {
        app.component('Step', Step);
        app.component('Steps', Steps);
        app.component('Instruction', Instruction);
    }
});
