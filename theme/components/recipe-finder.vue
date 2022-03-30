<template>
    <div class="recipe-finder">
        <div class="categories">
            <div class="category-item"
                v-for="category of categories"
                @click="onClick(category)"
                :key="category.id"
                :class="{ 'active': active === category.id }"
            >
                {{category.name}}
            </div>
        </div>
        <div class="recipes">
            <RouterLink class="recipe-item"
                v-for="recipe of recipes"
                :key="recipe.key"
                :to="recipe.path"
            >
                <div class="recipe-item__title">
                    <h3>{{recipe.title}}</h3>

                </div>
                <div class="recipe-item__content">
                    <p>{{recipe.frontmatter.description}}</p>
                </div>
            </RouterLink>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { usePages } from '@temp/pages';
import { useThemeData } from '../composables/use-theme-data';

export default defineComponent({
    name: 'RecipeFinder',
    setup() {
        const themeConfig = useThemeData();
        const pages = usePages();

        const active = ref(themeConfig.value.mainCategories[0].id);
        const categories = computed(() => themeConfig.value.mainCategories);
        const recipes = computed(() => pages.filter((page) => {
            const meta = page.frontmatter;
            if (!meta || !meta.recipe) return false;
            const [mainCategory] = meta.course.split('/');
            return mainCategory === active.value;
        }).slice(0, 4));

        return {
            active,
            categories,
            recipes,
            onClick(category) {
                active.value = category.id;
            },
        };
    },
});
</script>
<style lang="scss">
.recipe-finder {
    width: 1200px;
    margin: 0 auto;
    height: 30vh;
    display: flex;
    position: relative;

    .categories {
        width: 25%;
        padding: 0 40px;
        flex-shrink: 0;
    }
    .category-item {
        border-radius: 30px;
        margin: 32px 0;
        border: 1px solid var(--c-border);
        padding: 16px 32px;
        font-size: 18px;
        cursor: pointer;
        background-color: var(--c-bg);
    }
    .category-item.active {
        background-color: var(--c-brand);
        color: var(--c-bg);
        border-color: transparent;
        box-shadow: 4px 4px 70px 0px rgba(220,134,83,0.5);
    }

    .recipes {
        padding: 0 32px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .recipe-item {
        border-radius: 30px;
        border: 1px solid var(--c-border);
        padding: 16px 32px;
        height: max-content;
        cursor: pointer;
        background-color: var(--c-bg-light);
        margin: 16px;

        &__title {
            margin: 16px 0 32px;
            h3 {
                width: 50%;
                margin: 0;
                font-size: 28px;
            }
        }
    }
}
</style>
