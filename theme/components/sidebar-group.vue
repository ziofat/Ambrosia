<template>
    <div class="sidebar-group" :class="{ first, collapsable }">
        <p class="sidebar-heading" :class="{ open }" @click="$emit('toggle')">
            <span>{{ item.text }}</span>
            <i class="chevron" :class="{ open }">
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"></path></svg>
            </i>
        </p>

        <DropdownTransition>
        <ul ref="items"
            class="sidebar-group-items"
            v-if="open || !collapsable">
            <li v-for="(child, i) in item.children" v-bind:key="i">
                <SidebarLink :item="child" />
            </li>
        </ul>
        </DropdownTransition>
    </div>
</template>

<script>
import DropdownTransition from './dropdown-transition.vue';
import SidebarLink from './sidebar-link.vue';

export default {
    name: 'SidebarGroup',
    props: ['item', 'first', 'open', 'collapsable'],
    components: {
        SidebarLink,
        DropdownTransition,
    },
};
</script>
<style lang="scss" >
.sidebar-group {
    &:not(.first) {
        margin-top: 1em;
    }
    .sidebar-group {
        padding-left: 0.5em;
    }
    &:not(.collapsable) {
        .sidebar-heading {
            cursor: auto;
            color: inherit;
        }
    }
}

.sidebar-heading {
    color: #999;
    transition: color .15s ease;
    cursor: pointer;
    font-size: 1.1em;
    font-weight: bold;
    display: flex;
    padding: 0 1.5rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: inherit;
    span {
        flex: 1 1 0%;
    }
    .chevron {
        position: relative;
        transition: all 0.3s;
        top: 2px;
        svg {
            width: 16px;
            height: 16px;
        }
        &.open {
            transform: rotate(90deg);
        }
    }
}

.sidebar-group-items {
    transition: height .1s ease-out;
    overflow: hidden;
}
</style>
