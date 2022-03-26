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
        padding: 20px 80px;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid var(--c-border);
        display: flex;
        align-items: center;
    }

    .site-name {
        font-size: 24px;
        font-weight: 600;
        height: 40px;
        line-height: 40px;
        color: var(--c-text);
        & > span.brand-name {
            color: var(--c-brand);
        }
    }

    .links {
        margin-left: auto;
    }
}
</style>
