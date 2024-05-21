<template>
    <div class="dropdown-wrapper" :class="{ open }">
        <a class="dropdown-title" @click="toggle" :title="item.title">
            <span class="title">{{ item.text }}</span>
            <span class="arrow" :class="open ? 'down' : 'right'"></span>
        </a>

        <DropdownTransition>
        <ul class="nav-dropdown" v-show="open">
            <li class="dropdown-item"
                :key="subItem.link || index"
                v-for="(subItem, index) in item.children">
            <h4 v-if="subItem.type === 'links'">{{ subItem.text }}</h4>

            <ul class="dropdown-subitem-wrapper"
                v-if="subItem.type === 'links'">
                <li class="dropdown-subitem"
                    :key="childSubItem.link"
                    v-for="childSubItem in subItem.children">
                <NavLink :href="childSubItem.link" :title="childSubItem.title">
                    {{childSubItem.text}}
                </NavLink>
                </li>
            </ul>

            <NavLink v-else :href="subItem.link" :title="subItem.title">
                {{subItem.text}}
            </NavLink>
            </li>
        </ul>
        </DropdownTransition>
    </div>
</template>

<script>
import NavLink from './nav-link.vue';
import DropdownTransition from './dropdown-transition.vue';

export default {
    name: 'DropdownLink',
    components: { NavLink, DropdownTransition },

    data() {
        return {
            open: false,
        };
    },

    props: {
        item: {
            required: true,
        },
    },

    methods: {
        toggle() {
            this.open = !this.open;
        },
    },
};
</script>
<style lang="scss">
.dropdown-wrapper {
    cursor: pointer;
    position: relative;

    &:hover .nav-dropdown {
        display: block !important;
    }

    .dropdown-title {
        display: flex;
        align-items: center;
        &:hover {
            border-color: transparent;
        }
        .arrow {
            margin-left: 4px;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 6px solid var(--c-bg-arrow);
            border-bottom: 0;
            height: 6px;
        }
    }

    .nav-dropdown {
        color: var(--c-text);
        display: none;
        height: auto !important;
        box-sizing: border-box;
        border-radius: 4px;
        max-height: calc(100vh - 2.7rem);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        overflow-y: auto;
        position: absolute;
        top: 100%;
        right: 0;
        background-color: var(--c-bg);
        padding: 0.6rem 0;
        text-align: left;
        white-space: nowrap;
        margin: 0;
        z-index: 999;

        .dropdown-item {
            color: inherit;
            line-height: 1.7rem;
            h4 {
                margin: 0.45rem 0 0.45rem;
                border-top: 1px solid var(--c-border-dark);
                padding: 0.45rem 1.5rem 0 1.25rem;
            }
            .dropdown-subitem-wrapper {
                padding: 0;
                list-style: none;
                .dropdown-subitem {
                    font-size: 0.9em;
                }
            }
            a {
                display: block;
                line-height: 1.7rem;
                position: relative;
                border-bottom: none;
                font-weight: 400;
                margin-bottom: 0;
                padding: 0 1.5rem 0 1.25rem;
                &:hover {
                    color: var(--c-brand);
                    &.router-link-active {
                        color: var(--c-brand);
                        &::after {
                            content: "";
                            width: 0;
                            height: 0;
                            border-left: 5px solid var(--c-brand);
                            border-top: 3px solid transparent;
                            border-bottom: 3px solid transparent;
                            position: absolute;
                            top: calc(50% - 2px);
                            left: 9px;
                        }
                    }
                }
            }
            &:first-child h4 {
                margin-top: 0;
                padding-top: 0;
                border-top: 0;
            }
        }
    }
}

</style>
