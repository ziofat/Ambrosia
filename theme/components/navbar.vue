<template>
    <header class="navbar" ref="navbar">
        <div class="container" :class="{'with-sidebar': shouldShowSidebar}" >
            <RouterLink to="/recipes/" class="home-link">
                <div ref="siteName"
                    class="site-name"
                    v-if="title"
                >
                    <span class="brand-name">{{title[0]}}</span>
                    <span v-if="title[1]">.</span>
                    <span v-if="title[1]">{{title[1]}}</span>
                </div>
            </RouterLink>

            <div class="links">
                <NavLinks />
            </div>
        </div>
    </header>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useSiteData, usePageData } from '@vuepress/client';
import NavLinks from './nav-links.vue';

export default defineComponent({
    name: 'Navbar',
    components: {
        NavLinks,
    },
    setup() {
        const site = useSiteData();
        const pageData = usePageData();

        const pageType = computed(() => {
            const [, type] = pageData.value.path.split('/');
            return type;
        });

        const shouldShowSidebar = computed(() => ['guides', 'handbook'].includes(pageType.value));

        const title = computed(() => site.value.title.split('.'));

        return {
            title,
            shouldShowSidebar,
        };
    },
});
</script>

<style lang="scss">
header.navbar {
    height: 100px;
    z-index: 20;
    position: relative;
    border-bottom: 1px solid var(--c-border);

    .container {
        padding: 1.25rem 5rem;
        width: 100%;
        max-width: 1600px;
        margin: auto;
        height: 100%;
        display: flex;
        align-items: center;
        @media (max-width: 720px) {
            padding: 1rem 2rem;
            justify-content: center;
        }

        &.with-sidebar {
            max-width: unset;
            padding: 1.25rem 1.5rem;
        }
    }

    .site-name {
        font-size: 1.5rem;
        font-weight: 700;
        height: 2.5rem;
        line-height: 2.5rem;
        color: var(--c-text);
        & > span.brand-name {
            color: var(--c-brand);
            font-weight: 300;
        }
        @media (max-width: 720px) {
            height: 2rem;
            line-height: 2rem;
        }
    }

    .links {
        margin-left: auto;
        @media (max-width: 720px) {
            display: none;
        }
    }
    @media (max-width: 720px) {
        height: 60px;
    }
}
</style>
