<template>
    <nav class="nav-links"
        v-if="userLinks.length">
        <div class="nav-item"
            v-for="item in userLinks"
            :key="item.link">

            <DropdownLink v-if="item.type === 'links'" :item="item" />
            <IconLink v-else-if="item.icon !== undefined" :href="item.link" :title="item.text" :icon="item.icon" />
            <NavLink v-else :href="item.link" :title="item.title">{{ item.text }}</NavLink>
        </div>
    </nav>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useThemeData } from '../composables/use-theme-data';
import NavLink from './nav-link.vue';
import { resolveNavLinkItem } from '../utils/url';
import DropdownLink from './dropdown-link.vue';
import IconLink from './icon-link.vue';

export default defineComponent({
    name: 'NavLinks',
    components: {
        NavLink,
        IconLink,
        DropdownLink,
    },
    setup() {
        const themeConfig = useThemeData();

        const userLinks = computed(() => {
            const { navbar } = themeConfig.value;
            return (navbar || []).map((link) => ({
                ...resolveNavLinkItem(link),
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
    height: 40px;
    line-height: 40px;

    & > .nav-item {
        display: inline-block;
        padding: 0 16px;
        white-space: nowrap;
        height: 100%;
    }
}
</style>
