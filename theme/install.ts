import { defineClientAppEnhance } from '@vuepress/client';
import Step from './components/step.vue';
import Steps from './components/steps.vue';
import Instruction from './components/instruction.vue';

import './styles/index.scss';

export default defineClientAppEnhance(({ app }) => {
    app.component('Step', Step);
    app.component('Steps', Steps);
    app.component('Instruction', Instruction);
});
