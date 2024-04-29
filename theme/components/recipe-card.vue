<template>
    <div class="recipe-card" :style="`background-image: url('${recipe.image}')`">
        <div class="title">
            <h5>{{recipe.name}}</h5>
            <!-- <div class="sub-type"># {{ courseType }}</div> -->
        </div>
        <div class="logo-container" v-if="!recipe.image">
            <!-- <p>{{description}}</p> -->
            <Logo />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { CATEGORIES } from '../../scripts/categories';
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
        const findSubType = (type) => CATEGORIES.find((category) => category.id === type)?.text ?? '';
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
