<template>
    <div class="theme-container">
        <Navbar v-if="!isHome" />

        <main class="main-content">
            <Home v-if="isHome" />
            <Finder v-else-if="isFinder" />
            <Recipe v-else-if="isRecipe" />
            <Page v-else />
        </main>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { usePageFrontmatter } from '@vuepress/client';
import Home from '../views/home.vue';
import Page from '../views/page.vue';
import Finder from '../views/finder.vue';
import Recipe from '../views/recipe.vue';
import Navbar from '../components/navbar.vue';

export default defineComponent({
    components: {
        Home,
        Page,
        Navbar,
        Recipe,
        Finder,
    },

    setup() {
        const frontMatter = usePageFrontmatter();
        const isHome = computed(() => frontMatter.value.home);
        const isRecipe = computed(() => frontMatter.value.recipe);
        const isFinder = computed(() => frontMatter.value.finder);
        return {
            isHome,
            isRecipe,
            isFinder,
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
