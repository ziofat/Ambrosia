<template>
    <div class="list">
        <div class="ingredient" v-for="ingredient in ingredients" :key="ingredient.name">
            <p class="ingredient-name">{{ingredient.name}}<sub v-if="ingredient.optional">(可选)</sub></p>
        </div>
    </div>
    <div class="list">
        <div class="amount-item" v-for="ingredient in ingredients" :key="ingredient.name">
            <p class="amount-name">{{ingredient.amount.digit}} {{ingredient.amount.unit}}</p>
        </div>
    </div>
    <div class="list">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'Step',
    props: {
        ingredients: { type: String, default: '' },
        amount: { type: String, default: '' },
    },
    setup(props) {
        const names = props.ingredients.split('|');
        const amounts = props.amount.split('|').map((amount) => {
            const [digit, unit] = amount.split(',');
            return { digit: digit.trim(), unit: unit.trim() };
        });
        const ingredients = computed(() => names.map((name, i) => ({
            name,
            amount: amounts[i],
        })));

        return {
            ingredients,
        };
    },
});
</script>
<style lang="scss">
.list {
    padding: 8px 16px;
    p {
        margin: 0;
        line-height: 1.5;
            margin: 0.75rem 0;
    }
    border-bottom: 1px solid var(--c-brand);
}

</style>
