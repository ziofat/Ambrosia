<template>
    <div class="categories">
        <div class="category-item"
            v-for="category of categories"
            @click="onClick(category)"
            :key="category.id"
            :class="{ 'active': active.includes(category.id) }"
        >
            <div class="icon-container">
                <i :class="`fa-regular fa-${category.icon} fa-lg`"></i>
            </div>
            <div class="category-name">
                <span>{{category.name}}</span>
                <!-- <span>{{category.count}}</span> -->
            </div>
        </div>
        <div class="meta">
            <span class="count">共 {{count + variants}} 份食谱(含 {{variants}} 变体)</span>
        </div>
    </div>
    <div class="recipes">
        <RouterLink
            class="recipe-item"
            v-for="recipe of recipes"
            :key="recipe.objectID"
            :to="recipe.url"
        >
            <RecipeCard :recipe="recipe" />
        </RouterLink>
    </div>
</template>
<script lang="ts">
import {
    defineComponent, computed, ref, reactive,
} from 'vue';
import { useThemeData } from '../composables/use-theme-data';
import RecipeCard from './recipe-card.vue';

export default defineComponent({
    name: 'RecipeFinder',
    components: {
        RecipeCard,
    },
    props: {
        count: {
            type: Number,
            default: 0,
        },
        variants: {
            type: Number,
            default: 0,
        },
        recipes: {
            type: Array,
            default: [],
        },
        facet: {
            type: Object,
            default: [],
        },
    },
    setup(props) {
        const themeConfig = useThemeData();

        const active = reactive<string[]>([]);
        const categories = computed(() => themeConfig.value.mainCategories.map((category) => ({
            ...category,
            count: props.facet[category.id] ?? 0,
        })).filter((category) => category.count > 0));
        const recipes = computed(() => props.recipes.filter((recipe) => {
            const [mainCategory] = recipe.courseType;
            return active.includes(mainCategory) || active.length === 0;
        }));

        return {
            active,
            categories,
            recipes,
            count: props.count,
            variants: props.variants,
            onClick(category) {
                const idx = active.indexOf(category.id);
                if (idx < 0) {
                    active.push(category.id);
                } else {
                    active.splice(idx, 1);
                }
            },
        };
    },
});
</script>
<style lang="scss">
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
    margin: 2rem 0;
    border: 1px solid var(--c-text-lighter);
    border-radius: 8px;
    font-size: 1.125rem;
    display: flex;
    height: 50px;
    cursor: pointer;
    position: relative;

    @media (max-width: 720px) {
        font-size: 1rem;
        padding: 0.5rem 0.5rem;
        border-radius: 0;
        border: none;
        margin: 0;
        flex-shrink: 0;
        background: transparent;
    }

    &>.category-name {
        flex: 1;
        text-align: center;
        line-height: 48px;
        color: var(--c-text-lighter);
        transition: 0.15s color ease;
        &>span {
            z-index: 1;
            position: relative;
        }
        @media (max-width: 720px) {
            line-height: 36px;
            margin-left: 0.5rem;
        }
        &::before {
            content: '';
            left: 48px;
            right: 100%;
            height: 48px;
            background: var(--c-text-lighter);
            position: absolute;
            transition: 0.15s right ease;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            @media (max-width: 720px) {
                display: none;
            }
        }
    }

    &>.icon-container {
        width: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--c-text-lighter);
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        @media (max-width: 720px) {
            background-color: transparent;
            width: 24px;
        }
        &::before {
            content: '';
            left: -1px;
            top: -1px;
            width: 0;
            height: 50px;
            background: var(--c-brand);
            position: absolute;
            transition: 0.15s width ease;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
            @media (max-width: 720px) {
                display: none;
            }
        }
        svg {
            z-index: 1;
            color: var(--c-bg-light);
            @media (max-width: 720px) {
                color: var(--c-text-lighter);
            }
        }
    }

    &:hover {
        &>.category-name {
            color: var(--c-bg-light);
            @media (max-width: 720px) {
                color: var(--c-text-light);
            }
        }
        &>.category-name::before {
            right: 0;
        }
    }

    &.active {
        &>.icon-container::before {
            width: 50px;
        }
        &>.category-name {
            color: var(--c-bg-light);
            font-weight: 600;
            @media (max-width: 720px) {
                color: var(--c-brand);
                font-weight: unset;
            }
        }
        &>.category-name::before {
            right: 0;
        }
        @media (max-width: 720px) {
            background-color: transparent;
            color: var(--c-brand);
            border-bottom: 1px solid var(--c-brand);
            box-shadow: none;
        }
    }
}

.recipes {
    display: grid;
    flex: 1;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    @media (max-width: 720px) {
        padding: 1rem;
        width: 100%;
    }
}
.recipe-item {
    box-sizing: border-box;
    &:hover {
        color: unset;
    }
}
</style>
