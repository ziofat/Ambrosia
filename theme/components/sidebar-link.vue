<template>
    <RouterLink :to="link" class="sidebar-link" :class="{active}">
        {{text}}
    </RouterLink>
</template>
<script>
import { useRoute } from 'vue-router';
import { defineComponent, computed } from 'vue';
import { isActiveSidebarItem } from '../utils/url';

export default defineComponent({

    props: ['item'],
    setup(props) {
        const route = useRoute();
        const { item } = props;

        const isActive = computed(() => isActiveSidebarItem(item, route));
        return {
            link: props.item.link,
            text: props.item.text,
            active: isActive,
        };
    },
});
</script>

<style lang="scss">
a.sidebar-link {
    font-weight: 400;
    display: inline-block;
    color: var(--c-text);
    border-left: 0.25rem solid transparent;
    padding: 0.35rem 1rem 0.35rem 1.25rem;
    line-height: 1.4;
    width: 100%;
    box-sizing: border-box;
    &:hover {
        color: var(--c-brand);
    }
    &.active {
        font-weight: 600;
        color: var(--c-brand);
        border-left-color: var(--c-brand);
    }
    .sidebar-group & {
        padding-left: 2rem;
    }
}
</style>
