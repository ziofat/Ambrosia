<template>
    <RouterLink class="nav-link"
                :to="link"
                v-if="!isExternal(link)"
                :title="title"
                :exact="exact">
        <slot></slot>
    </RouterLink>

    <a v-else
        :href="link"
        :title="title"
        class="nav-link external"
        target="_blank"
        rel="noopener noreferrer">
        <slot></slot>
        <OutboundLink />
    </a>

</template>

<script lang="ts">
// import { ensureExt, isExternal } from '@vuepress/theme-default/util';
import { computed, defineComponent } from 'vue';
import { isExternal, ensureExt } from '../utils/url';

export default defineComponent({
    name: 'NavLink',

    methods: {
        isExternal(path: string) {
            return isExternal(path);
        },
    },

    props: {
        href: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
    },

    setup(props) {
        const link = computed(() => ensureExt(props.href));
        const exact = computed(() => link.value === '/');
        return { link, exact };
    },
});
</script>
