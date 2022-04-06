<template>
    <div class="list">
        <div class="ingredient" v-for="ingredient in ingredients" :key="ingredient.name">
            <p class="ingredient-name">
                <RouterLink v-if="ingredient.link" :to="ingredient.link">{{ingredient.name}}</RouterLink>
                <span v-else>{{ingredient.name}}</span>
                <span v-if="ingredient.preparation.length > 0">, {{ingredient.preparation.join(', ')}}</span>
                <sub v-if="ingredient.optional">(可选)</sub>
            </p>
        </div>
    </div>
    <div class="list">
        <div class="amount-item" v-for="ingredient in ingredients" :key="ingredient.name">
            <p class="amount-name" :title="getCount(ingredient)">{{ingredient.metric.amount ?? '适量'}} {{ingredient.metric.unit}}</p>
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
    methods: {
        getCount(ingredient) {
            const regexp = new RegExp(`(\\d+)\\s*${ingredient.metric.unit}\\/([^\\(\n]+)(\\(±(\\d)\\))?`);
            const match = regexp.exec(ingredient.converter ?? 'not match');
            if (match) {
                const [, amount, unit, , fuzzy] = match;
                const count = Math.round(ingredient.metric.amount / parseInt(amount, 10));
                if (fuzzy) {
                    const fuzzyCount = parseInt(fuzzy, 10);
                    return `${count - fuzzyCount}~${count + fuzzyCount} ${unit}`;
                }
                return `${count} ${unit}`;
            }
            return '';
        },
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
