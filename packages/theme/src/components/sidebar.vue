<template>
    <aside class="sidebar">
        <slot name="top"/>
        <ul class="sidebar-links" v-if="items.length">
            <li v-for="(item, i) in items" :key="i">
                <SidebarGroup
                    v-if="item.type === 'group'"
                    :item="item"
                    :first="i === 0"
                    :open="i === openGroupIndex"
                    :collapsable="item.collapsable"
                    @toggle="toggleGroup(i)"
                />
                <SidebarLink v-else :item="item"/>
            </li>
        </ul>
        <slot name="bottom"/>
    </aside>
</template>

<script>
import {
    defineComponent, ref, watch, watchEffect,
} from 'vue';
import { useRoute } from 'vue-router';
import SidebarGroup from './sidebar-group.vue';
import SidebarLink from './sidebar-link.vue';
import { isActiveLink } from '../utils/url';

export function resolveOpenGroupIndex(route, items) {
    for (let i = 0; i < items.length; i += 1) {
        const item = items[i];

        // eslint-disable-next-line no-loop-func
        if (item.type === 'group' && item.children.some((c) => c.path && isActiveLink(c.path, route))) {
            return i;
        }
    }
    return -1;
}

export default defineComponent({
    name: 'Sidebar',
    components: {
        SidebarGroup,
        SidebarLink,
    },
    props: ['items'],

    setup(props) {
        const route = useRoute();
        const items = ref([]);

        const openGroupIndex = ref(0);

        function refreshIndex() {
            const index = resolveOpenGroupIndex(
                route,
                props.items,
            );
            if (index > -1) {
                openGroupIndex.value = index;
            }
        }

        function toggleGroup(index) {
            openGroupIndex.value = index === openGroupIndex.value ? -1 : index;
        }

        watch(() => route.path, refreshIndex);
        watchEffect(() => {
            items.value = props.items;
        });

        return {
            items,
            toggleGroup,
        };
    },

});
</script>

<style lang="scss">
.sidebar {
    background-color: var(--c-bg);
    position: fixed;
    z-index: 10;
    margin: 0;
    left: 0;
    bottom: 0;
    top: 100px;
    width: 16.25rem;
    box-sizing: border-box;
    overflow-y: auto;
    box-shadow: 0 0 25px rgb(0 0 0 / 10%);

    @media (max-width: 720px) {
        display: none;
    }

    .sidebar-heading {
        text-transform: uppercase;
    }
    ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
    }
    a {
        display: inline-block;
    }
    .nav-links {
        position: relative;
        display: none;
        padding: 0.5rem 0 0.75rem 0;
        background: var(--c-bg-lighter);

        .dropdown-wrapper > a,
        .nav-item > a {
            text-transform: uppercase;
            padding: 0.5rem 0 0.5rem 1.5rem;

            &.router-link-active {
                display: none;
            }
        }
        .dropdown-wrapper {
            .nav-dropdown {
                padding: 0.5rem 0 0.5rem 1.5rem;
            }
        }

        a {
            font-weight: 600;
        }
    }
    .sidebar-links {
        padding: 1.5rem 0;
    }
}
</style>
