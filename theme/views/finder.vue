<template>
    <div class="recipe-list">
        <RecipeFinder :count="count" :variants="variants" />
    </div>
</template>
<script lang="ts">
import { usePageFrontmatter } from '@vuepress/client';
import { computed, defineComponent } from 'vue';
import RecipeFinder from '../components/recipe-finder.vue';

export default defineComponent({
    name: 'RecipeList',
    components: {
        RecipeFinder,
    },
    setup() {
        const meta = usePageFrontmatter();
        const count = computed(() => meta.value.count);
        const variants = computed(() => meta.value.variants);

        return {
            count,
            variants,
        };
    },
});
</script>
<style lang="scss">
.recipe-list {
    padding: 2rem 0;
    margin: auto;
    max-width: 1600px;
    @media (max-width: 720px) {
        padding: 0;
    }
}
</style>
