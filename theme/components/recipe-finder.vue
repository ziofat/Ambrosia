<template>
    <div class="recipe-finder">
        <div class="categories">
            <div class="category-item"
                v-for="category of categories"
                @click="onClick(category)"
                :key="category.id"
                :class="{ 'active': active === category.id }"
            >
                <div class="icon-container">
                    <i :class="`fa-regular fa-${category.icon}`"></i>
                </div>
                <span>{{category.name}}</span>
            </div>
            <div class="meta">
                <span class="count">共 {{count + variants}} 份食谱(含 {{variants}} 变体)</span>
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
    props: {
        count: {
            type: Number,
            default: 0,
        },
        variants: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        const themeConfig = useThemeData();
        const pages = usePages();

        const active = ref(themeConfig.value.mainCategories[0].id);
        const categories = computed(() => themeConfig.value.mainCategories);
        const recipes = computed(() => pages.filter((page) => {
            const meta = page.frontmatter;
            if (!meta || !meta.recipe) return false;
            const [mainCategory] = meta.course.split('/');
            return mainCategory === active.value;
        }).slice(0, 8).sort((a, b) => b.frontmatter.createdTime - a.frontmatter.createdTime));

        return {
            active,
            categories,
            recipes,
            count: props.count,
            variants: props.variants,
            onClick(category) {
                active.value = category.id;
            },
        };
    },
});
</script>
<style lang="scss">
.recipe-finder {
    width: 100%;
    display: flex;
    position: relative;
    @media (max-width: 720px) {
        display: block;
    }

    .categories {
        width: 25%;
        min-width: 260px;
        padding: 0 40px;
        flex-shrink: 0;
        @media (max-width: 720px) {
            display: flex;
            padding: 0;
            width: 100%;
            overflow-x: auto;
            border-bottom: 1px solid var(--c-border);
        }

        .meta {
            margin-top: 1rem;
            color: var(--c-text-quote);
            text-align: center;

            @media (max-width: 720px) {
                display: none;
            }
        }
    }
    .category-item {
        border-radius: 30px;
        margin: 2rem 0;
        border: 1px solid var(--c-border);
        padding: 1rem 2rem;
        font-size: 1.125rem;
        cursor: pointer;
        background-color: var(--c-bg);
        @media (max-width: 720px) {
            font-size: 1rem;
            padding: 1rem 0.5rem;
            border-radius: 0;
            border: none;
            margin: 0;
            flex-shrink: 0;
        }
        display: flex;
    }
    .category-item.active {
        background-color: var(--c-brand);
        color: var(--c-bg);
        border-color: transparent;
        box-shadow: 4px 4px 70px 0px rgba(220,134,83,0.5);
        @media (max-width: 720px) {
            background-color: transparent;
            color: var(--c-brand);
            border-bottom: 1px solid var(--c-brand);
            box-shadow: none;
        }
    }
    .category-item > span {
        margin-left: 16px;
    }
    .category-item > .icon-container {
        width: 24px;
        display: flex;
        justify-content: center;
    }

    .recipes {
        padding: 0 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        @media (max-width: 720px) {
            padding: 1rem;
            width: 100%;
        }
    }

    .recipe-item {
        border-radius: 30px;
        border: 1px solid var(--c-border);
        padding: 1rem 2rem;
        height: max-content;
        cursor: pointer;
        background-color: var(--c-bg-light);
        margin: 1rem;

        @media (max-width: 720px) {
           border-radius: 1rem;
           margin: 0.5rem 0;
           padding: 1rem;
        }

        &__title {
            margin: 16px 0 32px;
            @media (max-width: 720px) {
                margin: 0.5rem 0;
            }
            h3 {
                width: 50%;
                margin: 0;
                font-size: 28px;
            }
        }
    }
}
</style>
