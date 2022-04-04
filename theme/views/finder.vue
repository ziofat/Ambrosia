<template>
    <div class="recipe-list">
        <RecipeFinder />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import RecipeFinder from '../components/recipe-finder.vue';

export default defineComponent({
    name: 'RecipeList',
    components: {
        RecipeFinder,
    },
});
</script>
<style lang="scss">
.recipe-list {
    padding: 2rem 0;
}
</style>
