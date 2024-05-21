<template>
    <slot v-if="match"></slot>
</template>
<script lang="ts">
import { computed, inject } from 'vue';

export default {
    name: 'Instruction',
    props: {
        variant: { type: String, default: '' },
    },
    setup(props) {
        const activeVariant = inject<any>('activeVariant');
        const variantList = props.variant.split(',');
        const match = computed(() => props.variant === '' || variantList.includes(activeVariant.value));
        return {
            match,
        };
    },
};
</script>
