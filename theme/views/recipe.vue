<template>
    <div class="recipe">
        <div class="page-content">
            <article class="container">
                <div class="recipe-header">
                    <h1>{{ title }}</h1>
                    <div class="recipe-categories" v-if="categories">
                        <RouterLink
                            class="category-link"
                            v-for="category in categories"
                            :key="category.link"
                            :to="category.link"
                        >
                            <span class="tag">{{category.name}}</span>
                        </RouterLink>
                    </div>
                    <div class="recipe-desc">
                        {{description}}
                    </div>
                    <div class="recipe-info">
                        <div class="recipe-info-card" v-if="time !== 'undefined'">
                            <div class="value">{{time}}</div>
                            <div class="label">分钟</div>
                        </div>
                        <div class="recipe-info-card" v-if="yields !== 'undefined'">
                            <div class="value">{{yields}}</div>
                            <div class="label">产出</div>
                        </div>
                        <div class="recipe-info-card" v-if="ingredients !== 'undefined'">
                            <div class="value">{{ingredients}}</div>
                            <div class="label">原料</div>
                        </div>
                        <div class="recipe-info-card" v-if="servings !== 'undefined'">
                            <div class="value">{{servings}}</div>
                            <div class="label">人份</div>
                        </div>
                    </div>
                </div>
                <div class="recipe-content">
                    <Content :custom="false"/>
                </div>
            </article>
        </div>
        <div class="recipe-settings">

        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { usePageData, usePageFrontmatter } from '@vuepress/client';
import { usePages } from '@temp/pages';

export default defineComponent({
    name: 'Recipe',
    setup() {
        const pages = usePages();
        const page = usePageData();
        const meta = usePageFrontmatter();
        const title = computed(() => page.value.title);

        const time = computed(() => meta.value.time);
        const yields = computed(() => meta.value.yield);
        const ingredients = computed(() => meta.value.ingredients);
        const servings = computed(() => meta.value.servings);
        const description = computed(() => meta.value.description);

        const categories = computed(() => meta.value.course.split('/').map((course, i, courses) => {
            const link = courses.reduce((acc, cur, j) => (j <= i ? `${acc}/${cur}` : acc), '/recipes');
            const name = pages.find((p) => p.path === `${link}/`).title;
            return { name, link };
        }));

        return {
            title,
            description,
            categories,
            time,
            yields,
            ingredients,
            servings,
        };
    },
});
</script>
<style lang="scss">
.recipe {
    padding-bottom: 30px;
    word-break: break-word;

    .page-content {
        display: flex;
        padding-right: 40%;

        .recipe-header {
            position: relative;
            padding-top: 36px;

            .recipe-categories {
                span {
                    margin-right: 10px;
                }
                a.category-link:hover {
                    color: var(--c-brand);
                }
                .tag {
                    display: inline-block;
                    padding: 0 16px;
                    height: 28px;
                    line-height: 26px;
                    border: 1px solid var(--c-border);
                    border-radius: 14px;
                    font-size: 14px;
                    font-weight: 500;
                    margin-right: 5px;
                }
                padding: 16px 0;
            }

            .recipe-desc {
                padding: 24px 0;
                width: 80%;
                color: var(--c-light);
                line-height: 2;
            }

            .recipe-info {
                display: flex;
                padding: 16px 0;
                .recipe-info-card {
                    display: block;
                    width: 120px;
                    padding: 0 24px;

                    >.value {
                        font-size: 18px;
                        font-weight: 600;
                        line-height: 1.5;
                    }

                    >.label {
                        font-size: 12px;
                        font-weight: 400;
                        line-height: 1.5;
                    }

                    ~.recipe-info-card {
                        border-left: 1px solid var(--c-border);
                    }
                }
            }
        }
        .recipe-content {
            h1 { display: none;}
        }
    }
}
</style>
