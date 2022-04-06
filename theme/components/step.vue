<template>
    <div class="list">
        <div class="ingredient" v-for="ingredient in ingredients" :key="ingredient.name">
            <p class="ingredient-name">{{ingredient.detailName}}<sub v-if="ingredient.optional">(可选)</sub></p>
        </div>
    </div>
    <div class="list">
        <div class="amount-item" v-for="ingredient in ingredients" :key="ingredient.name">
            <p class="amount-name">{{ingredient.metric.amount}} {{ingredient.metric.unit}}</p>
        </div>
    </div>
    <div class="list step-content">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'Step',
    props: {
        ingredients: { type: String, default: '' },
    },
    setup(props) {
        const ingredients = computed(() => {
            const raw = atob(props.ingredients);
            const ingredientsJson = decodeURIComponent(raw);
            return JSON.parse(ingredientsJson);
        });

        return {
            ingredients,
        };
    },
});
</script>
<style lang="scss">
.list {
    padding: 8px 16px;
    border-bottom: 1px solid var(--c-brand);
    flex-basis: 50%;
    @media (max-width: 720px) {
        border-bottom: 1px solid var(--c-border);
    }

    p {
        margin: 0;
        line-height: 1.5;
        margin: 0.75rem 0;
    }
}

.step-content {
    flex-basis: 100%;
    border-bottom: 1px solid var(--c-brand);
}

</style>
