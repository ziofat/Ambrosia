<template>
    <transition name="dropdown"
                @enter="setHeight"
                @after-enter="unsetHeight"
                @before-leave="setHeight">
        <slot/>
    </transition>
</template>

<script>
export default {
    name: 'DropdownTransition',

    methods: {
        setHeight(items) {
            // eslint-disable-next-line no-param-reassign
            items.style.height = `${items.scrollHeight}px`;
        },

        unsetHeight(items) {
            // eslint-disable-next-line no-param-reassign
            items.style.height = '';
        },
    },
};
</script>
<style lang="scss">
.dropdown-enter, .dropdown-leave-to {
    height: 0 !important;
}
</style>
