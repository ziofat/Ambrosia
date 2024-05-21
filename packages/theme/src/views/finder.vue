<template>
    <div class="recipe-finder">
        <div class="search-area">
            <SearchBox :total="(count ?? 0) + (variants ?? 0)" @search="onResultChange" />
        </div>

        <div class="results">
            <RecipeFinder :count="count" :variants="variants" :recipes="recipes" :facet="facets" />
        </div>
    </div>
</template>
<script lang="ts">
import { usePageFrontmatter } from '@vuepress/client';
import { computed, defineComponent, ref } from 'vue';
import RecipeFinder from '../components/recipe-finder.vue';
import SearchBox from '../components/search-box.vue';
import { FinderPageFormatter } from '../types/formatter';
import { usePages } from '@temp/pages';

export default defineComponent({
    name: 'RecipeList',
    components: {
        RecipeFinder,
        SearchBox,
    },
    setup() {
        const meta = usePageFrontmatter<FinderPageFormatter>();
        const count = computed(() => meta.value.count);
        const variants = computed(() => meta.value.variants);
        const recipes = ref<any>([]);
        const facets = ref({});
        const pages: any[] = usePages();

        function onResultChange(err, results) {
            if (err) {
                const fallbackFacets = {};
                const hits = pages.filter(page => page.frontmatter.recipe).flatMap(page => {
                    const courseType = page.frontmatter.course.split('/');
                    courseType.forEach(element => {
                        if (!fallbackFacets[element]) {
                            fallbackFacets[element] = 1;
                        }
                        fallbackFacets[element]++;
                    });
                    if (page.frontmatter.variants) {
                        return page.frontmatter.variants.map(variant => ({
                            name: variant,
                            url: `${page.path}?variant=${variant}`,
                            image: `recipe-static/${variant}.jpg`,
                            createdTime: page.frontmatter.createdTime,
                            courseType,
                        }));
                    }

                    return [{
                        name: page.title,
                        url: page.path,
                        image: `recipe-static/${page.title}.jpg`,
                        createdTime: page.frontmatter.createdTime,
                        courseType,
                    }];
                }).sort((a, b) => b.createdTime - a.createdTime);
                recipes.value = hits;
                facets.value = fallbackFacets;
                return;
            }
            recipes.value = results.hits;
            facets.value = results.facets.courseType;
        }

        return {
            count,
            variants,
            recipes,
            facets,
            onResultChange,
        };
    },
});
</script>
<style lang="scss">
.recipe-finder {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background: var(--c-bg-lighter);

    @media (max-width: 720px) {
        top: 59px;
    }

    .search-area {
        display: flex;
        height: 250px;
        background: var(--c-bg);
        @media (max-width: 720px) {
            height: 100px;
        }
    }

    .results {
        display: flex;
        max-width: 1600px;
        margin: auto;
        padding: 2rem 0;
        @media (max-width: 720px) {
            padding: 0;
            display: block;
        }
    }
}
</style>
