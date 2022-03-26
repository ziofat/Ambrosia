<template>
    <div class="theme-container">
        <Navbar />

        <main class="main-content">
            <Home v-if="isHome" />
            <Page v-else />
        </main>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { usePageFrontmatter } from '@vuepress/client';
import Home from '../views/home.vue';
import Page from '../views/page.vue';
import Navbar from '../components/navbar.vue';

export default defineComponent({
    components: {
        Home,
        Page,
        Navbar,
    },

    setup() {
        const frontMatter = usePageFrontmatter();
        const isHome = computed(() => frontMatter.value.home);
        return {
            isHome,
        };
    },
});

</script>
<style lang="scss">
html, body {
    margin: 0;
    padding: 0;
}
body, #app {
    height: 100vh;
}
.theme-container {
    height: 100%;
    position: relative;
    background-color: var(--c-bg);
}
</style>
<style src="../styles/index.scss" lang="scss" />
