<template>
    <nav class="nav-links"
        v-if="userLinks.length">
        <div class="nav-item"
            v-for="item in userLinks"
            :key="item.link">

            <span v-if="item.type === 'links'" :item="item"/>
            <NavLink v-else :href="item.link" v-html="item.text" :title="item.title"></NavLink>
        </div>
    </nav>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useThemeData } from '../composables/useThemeData';
import NavLink from './nav-link.vue';
import { resolveNavLinkItem } from '../utils/url';
// import DropdownLink from '../dropdown/dropdown-link.vue';

export default defineComponent({
    name: 'NavLinks',
    components: {
        NavLink,
    },
    setup() {
        const themeConfig = useThemeData();

        const userLinks = computed(() => {
            const { navbar } = themeConfig.value;
            return (navbar || []).map((link) => Object.assign(resolveNavLinkItem(link), {
                children: (link.children || []).map(resolveNavLinkItem),
            }));
        });

        return {
            userLinks,
        };
    },
});

</script>

<style lang="scss">
nav.nav-links {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: var(--c-text);

    & > .nav-item {
        display: inline-block;
        padding: 0 16px;
        white-space: nowrap;
    }
}
</style>
