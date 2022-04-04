<template>
    <div class="theme-container">
        <Navbar v-if="!isHome" />

        <main class="main-content">
            <Home v-if="isHome" />
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
import Recipe from '../views/recipe.vue';
import Navbar from '../components/navbar.vue';

export default defineComponent({
    components: {
        Home,
        Page,
        Navbar,
        Recipe,
    },

    setup() {
        const frontMatter = usePageFrontmatter();
        const isHome = computed(() => frontMatter.value.home);
        const isRecipe = computed(() => frontMatter.value.recipe);
        return {
            isHome,
            isRecipe,
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
