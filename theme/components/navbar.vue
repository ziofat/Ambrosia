<template>
    <header class="navbar" ref="navbar">
        <div class="container">
            <RouterLink to="/" class="home-link">
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
import { useSiteData } from '@vuepress/client';
import NavLinks from './nav-links.vue';

export default defineComponent({
    name: 'Navbar',
    components: {
        NavLinks,
    },
    setup() {
        const site = useSiteData();

        const title = computed(() => site.value.title.split('.'));

        return {
            title,
        };
    },
});
</script>

<style lang="scss">
header.navbar {
    height: 100px;
    z-index: 20;
    position: relative;

    .container {
        padding: 1.25rem 5rem;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid var(--c-border);
        display: flex;
        align-items: center;
        @media (max-width: 720px) {
            padding: 1rem 2rem;
            justify-content: center;
        }
    }

    .site-name {
        font-size: 1.5rem;
        font-weight: 600;
        height: 2.5rem;
        line-height: 2.5rem;
        color: var(--c-text);
        & > span.brand-name {
            color: var(--c-brand);
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
