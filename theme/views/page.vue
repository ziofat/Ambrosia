<template>
    <Sidebar v-if="shouldShowSidebar" :items="sidebarItems" />
    <div class="page" :class="{'with-sidebar': shouldShowSidebar}">
        <div class="page-content">
            <article class="container">
                <Content :custom="false"/>
            </article>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { usePageData } from '@vuepress/client';
import { useThemeData } from '../composables/use-theme-data';
import Sidebar from '../components/sidebar.vue';
import { resolveSidebarItem } from '../utils/url';

export default defineComponent({
    name: 'Page',
    components: {
        Sidebar,
    },
    setup() {
        const pageData = usePageData();
        const themeData = useThemeData();

        const pageType = computed(() => {
            const [, type] = pageData.value.path.split('/');
            return type;
        });

        const shouldShowSidebar = computed(() => ['guides', 'handbook'].includes(pageType.value));
        const sidebarItems = computed(() => {
            if (!shouldShowSidebar.value) {
                return [];
            }
            return ((themeData.value.sidebar ?? {})[pageType.value] ?? [])
                .map((link: any) => Object.assign(resolveSidebarItem(link), {
                    children: (link.children || []).map(resolveSidebarItem),
                }));
        });

        return {
            shouldShowSidebar,
            sidebarItems,
        };
    },
});
</script>
<style lang="scss">
.page {
    padding-bottom: 30px;
    word-break: break-word;
    &.with-sidebar {
        padding-left: 16.25rem;
        @media (max-width: 720px) {
            padding-left: 0;
        }
    }
}
</style>
