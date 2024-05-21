<template>
    <div class="recipe-card">
        <div class="logo-container">
            <!-- <p>{{description}}</p> -->
            <Logo />
        </div>
        <div :style="`background-image: url('/${recipe.image}');`" class="topic-image"></div>
        <div class="title">
            <h5>{{recipe.name}}</h5>
            <!-- <div class="sub-type"># {{ courseType }}</div> -->
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useThemeData } from '../composables/use-theme-data';
import Logo from './logo.vue';

export default defineComponent({
    name: 'RecipeCard',
    components: {
        Logo,
    },
    props: {
        recipe: {
            type: Object,
            required: true,
        },
    },
    setup({ recipe }) {
        const themeConfig = useThemeData();
        const findSubType = (type) => themeConfig.value.categories.find((category) => category.id === type)?.text ?? '';
        return {
            courseType: findSubType(recipe.courseType[0]),
        };
    },
});
</script>

<style lang="scss">
.recipe-card {
    border-radius: 16px;
    cursor: pointer;
    background-color: var(--c-bg-light);
    margin: 1rem;
    background-size: contain;
    aspect-ratio: 1 / 1;
    position: relative;
    max-height: 400px;
    border: 1px solid var(--c-bg-light);
    overflow: hidden;

    &:hover {
        border: 1px solid var(--c-brand);
        box-shadow: 0px 0px 10px 1px var(--c-brand);
    }

    @media (max-width: 720px) {
        margin: 0.5rem 0;
        padding: 1rem;
    }

    .logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0.45;
    }

    .topic-image {
        width: 150%;
        height: 100%;
        background-size: cover;
        background-position: center;
        position: absolute;
        top: 0;
        left: 0;
        filter: blur(2px) saturate(0.8);
    }

    .logo {
        width: 50%;
        height: 50%;
    }

    .title {
        padding-left: 1rem;
        padding-right: 0.8rem;
        position: absolute;
        bottom: 0;
        right: 0;
        background: var(--c-bg-lighter);
        opacity: 0.8;
        border-top-left-radius: 16px;
        display: flex;
        @media (max-width: 720px) {
        }
        h5 {
            margin: 0;
            font-size: 20px;
            line-height: 1.5;
        }
    }
    .sub-type {
        width: 0;
        height: 30px;
        overflow: hidden;
        line-height: 30px;
        padding-left: 12px;
        box-sizing: border-box;
    }
}
.recipe-card:hover {
    .sub-type {
        width: auto;
    }
}
</style>
