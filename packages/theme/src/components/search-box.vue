<template>
    <div class="search-box">
        <i class="fa-regular fa-magnifying-glass fa-lg"></i>
        <input :placeholder="`在 ${total} 份菜谱中搜寻...`" @input="search" />
        <div class="credit">
            <span>Powerd by </span>
            <a href="https://www.algolia.com/developers/" target="_blank">
                <i class="fa-brands fa-algolia"></i>
                <span> Algolia</span>
            </a>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import algolia from 'algoliasearch';

const debounce = (fn, ms = 0) => {
    let timeoutId;
    return function func(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export default defineComponent({
    name: 'SearchBox',
    emits: ['search'],
    setup(props, context) {
        const index = algolia('52DE6Z0WUS', 'e09af6bf1350a6803fbc8d6823852912').initIndex('ambrosia_recipes');
        const total = ref(0);

        const search = (event?: Event) => {
            const query = event?.target?.value ?? '';
            index.search(query, {
                facets: ['courseType'],
            }).then((results) => {
                context.emit('search', null, results);
                total.value = results.nbHits;
            }).catch((err) => {
                context.emit('search', err, {});
            });
        };

        search();
        return {
            search: debounce(search, 300),
            total,
        };
    },
});

</script>
<style lang="scss">
.search-box {
    display: flex;
    margin: 4rem auto;
    max-width: 90ch;
    height: 68px;
    flex: 1;
    position: relative;
    align-items: center;

    @media (max-width: 720px) {
        margin: 1rem auto;
    }

    &>svg {
        position: absolute;
        left: 1.5rem;
        color: var(--c-text-lighter);
    }

    &>input {
        width: 100%;
        font-size: 1rem;
        background: transparent;
        border: none;
        height: 68px;
        border-radius: 34px;
        border: 2px solid var(--c-text);
        padding: 6px 8rem 8px 4rem;
        outline: none;
        color: var(--c-text);
        line-height: 4rem;
        &:focus {
            box-shadow: 0 0 0 1px var(--c-bg), 0 0 0 4px var(--c-brand);
        }
    }

    .credit {
        position: absolute;
        right: 2rem;
        color: var(--c-text-quote);
        &>a {
            margin-left: 0.5rem;
            color: var(--c-text-quote);
        }
        &>a:hover {
            color: var(--c-text-lighter);
        }
    }
}
</style>
