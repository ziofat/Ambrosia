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
            <p class="amount-name">
                <span v-if="showCount">{{getCount(ingredient) || `${ingredient.metric.amount * scale || '适量'} ${ingredient.metric.unit}`}}</span>
                <span v-else>{{ingredient.metric.amount * scale || '适量'}} {{ingredient.metric.unit}} </span>
            </p>
        </div>
    </div>
    <div class="list step-content">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from 'vue';

export default defineComponent({
    name: 'Step',
    props: {
        ingredients: { type: String, default: '' },
    },
    setup(props) {
        const variant = inject<any>('activeVariant');
        const showCount = inject('showCount');
        const scale = inject<any>('scale');

        const ingredients = computed(() => {
            const raw = atob(props.ingredients);
            const ingredientsJson = decodeURIComponent(raw);
            return JSON.parse(ingredientsJson)
                .filter((i) => i.variants.length === 0 || i.variants.includes(variant.value));
        });

        function getCount(ingredient) {
            const regexp = new RegExp(`([0-9]{1,}\\.?[0-9]*)\\s*${ingredient.metric.unit}\\/([^\\(\n]+)(\\((±|\\+|-)(\\d)\\))?`);
            const match = regexp.exec(ingredient.converter ?? 'not match');
            if (match) {
                const [, amount, unit, fuzzy, fuzzyType, fuzzyCountString] = match;
                const count = Math.ceil((ingredient.metric.amount / parseFloat(amount)) * scale.value);
                if (fuzzy) {
                    const fuzzyCount = Math.round(parseInt(fuzzyCountString, 10) * scale.value);
                    let min = count - fuzzyCount;
                    if (min < 1) {
                        min = 1;
                    }
                    const max = count + fuzzyCount;
                    switch (fuzzyType) {
                        case '+':
                            return `${count}~${max} ${unit}`;
                        case '-':
                            if (min === count) {
                                return `${count} ${unit}`;
                            }
                            return `${min}~${count} ${unit}`;
                        case '±':
                        default:
                            if (min === max) {
                                return `${min} ${unit}`;
                            }
                            return `${min}~${max} ${unit}`;
                    }
                }
                return `${count} ${unit}`;
            }
            return '';
        }

        return {
            ingredients,
            showCount,
            variant,
            scale,
            getCount,
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

    &:empty {
        display: none;
    }
}

.step-content {
    flex-basis: 100%;
    border-bottom: 1px solid var(--c-brand);
}

</style>
