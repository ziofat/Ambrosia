<template>
    <div class="background">
        <img :src="imageUrl" />
        <div class="mask"></div>
    </div>
    <div class="recipe">
        <div class="page-content">
            <article class="container">
                <div class="recipe-header">
                    <h1>{{ activeVariant }}</h1>
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
                        <div class="recipe-info-card" v-if="yields.digit > 0">
                            <div class="value">{{yields.digit * scale}} {{yields.unit}}</div>
                            <div class="label">产出</div>
                        </div>
                        <div class="recipe-info-card" v-if="ingredients !== 'undefined'">
                            <div class="value">{{ingredients}}</div>
                            <div class="label">原料</div>
                        </div>
                        <div class="recipe-info-card" v-if="servings && servings !== 'undefined'">
                            <div class="value">{{servings * scale}}</div>
                            <div class="label">人份</div>
                        </div>
                    </div>
                </div>
                <div class="recipe-body">
                    <div class="recipe-content">
                        <Content :custom="false"/>
                    </div>
                    <div class="recipe-settings">
                        <div class="recipe-settings-header">
                            <h2>选项</h2>
                        </div>
                        <div class="recipe-settings-content">
                            <label class="form-switch">
                                <input type="checkbox" @change="changeCount" :checked="showCount">
                                <i class="form-icon"></i>
                                显示参考单位
                                <RouterLink to="/guides/basic/scale.html"><i class="fa-regular fa-circle-question"></i></RouterLink>
                            </label>
                            <div class="scale">
                                <label>分量缩放</label>
                                <div class="scale-items">
                                    <div
                                        class="scale-item"
                                        v-for="item in [0.5, 1, 2, 4]"
                                        :key="`scale-${item}`"
                                        @click="setScale(item)"
                                        :class="{active: scale === item}"
                                    >
                                        {{item}}
                                    </div>
                                </div>
                            </div>
                            <div class="variants" v-if="variants.length>1">
                                <label>菜谱变体</label>
                                <ul>
                                    <li
                                        v-for="variant in variants"
                                        :key="variant"
                                        :class="{active: variant === activeVariant}"
                                        @click="changeVariant(variant)"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 256 512"><path d="M89.45 87.5l143.1 152c4.375 4.625 6.562 10.56 6.562 16.5c0 5.937-2.188 11.87-6.562 16.5l-143.1 152C80.33 434.1 65.14 434.5 55.52 425.4c-9.688-9.125-10.03-24.38-.9375-33.94l128.4-135.5l-128.4-135.5C45.49 110.9 45.83 95.75 55.52 86.56C65.14 77.47 80.33 77.87 89.45 87.5z" fill="currentColor" /></svg>
                                        {{variant}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
import {
    computed, defineComponent, provide, ref,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePageData, usePageFrontmatter } from '@vuepress/client';
import { usePages } from '@temp/pages';

export default defineComponent({
    name: 'Recipe',
    setup() {
        const pages = usePages();
        const page = usePageData();
        const meta = usePageFrontmatter();
        const title = computed(() => page.value.title);
        const route = useRoute();
        const router = useRouter();

        const time = computed(() => meta.value.time);
        const yields = computed(() => {
            const value = meta.value.yield || '';
            const match = value.match(/\d+\s*(\w+)/);
            if (match) {
                return {
                    digit: parseFloat(match.input),
                    unit: match[1],
                };
            }
            return { digit: parseFloat(value) || 0, unit: '' };
        });
        const ingredients = computed(() => meta.value.ingredients);
        const servings = computed(() => meta.value.servings);
        const description = computed(() => meta.value.description);
        const variants = computed(() => meta.value.variants ?? [title.value]);
        const activeVariant = computed(() => route.query.variant ?? variants.value[0]);

        const categories = computed(() => meta.value.course.split('/').map((course, i, courses) => {
            const link = courses.reduce((acc, cur, j) => (j <= i ? `${acc}/${cur}` : acc), '/recipes');
            const name = pages.find((p) => p.path === `${link}/`).title;
            return { name, link };
        }));

        const showCount = ref(false);
        const scale = ref(1);
        const imageUrl = computed(() => `/recipe-static/${activeVariant.value}.jpg`);

        provide('showCount', showCount);
        provide('activeVariant', activeVariant);
        provide('scale', scale);

        function changeCount(e) {
            showCount.value = e.target.checked;
        }

        function changeVariant(name) {
            if (name === variants.value[0]) {
                router.push({ path: route.path, query: { variant: undefined } });
            } else {
                router.push({ path: route.path, query: { variant: name } });
            }
        }

        function setScale(s) {
            scale.value = s;
        }

        return {
            title,
            description,
            categories,
            time,
            yields,
            ingredients,
            servings,
            showCount,
            changeCount,
            variants,
            activeVariant,
            changeVariant,
            scale,
            setScale,
            imageUrl,
        };
    },
});
</script>
<style lang="scss">
.recipe {
    padding-bottom: 30px;
    word-break: break-word;
    position: relative;

    .page-content {
        display: flex;

        .recipe-header {
            position: relative;
            padding-top: 36px;
            padding-right: 35%;
            @media (max-width: 720px) {
                padding-right: 1rem;
                padding-left: 1rem;
            }

            .recipe-categories {
                span {
                    margin-right: 10px;
                }
                a {
                    color: var(--c-text);
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
                @media (max-width: 720px) {
                    padding: 0.5rem 0;
                }
            }

            .recipe-desc {
                padding: 1.5rem 0;
                width: 80%;
                color: var(--c-light);
                line-height: 2;
                @media (max-width: 720px) {
                    width: 100%;
                    padding: 0.5rem 0;
                }
            }

            .recipe-info {
                display: flex;
                padding: 1rem 0;
                @media (max-width: 720px) {
                    padding: 0.5rem 0;
                }
                .recipe-info-card {
                    display: block;
                    max-width: 120px;
                    flex: 1;
                    padding: 0 1.5rem;
                    @media (max-width: 720px) {
                        padding: 0 0.75rem ;
                    }

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
    }

    .recipe-body {
        display: flex;
        justify-content: space-between;

        .recipe-content {
            h1 { display: none;}
            min-width: 625px;

            @media (max-width: 720px) {
                min-width: 100%;
            }
        }

        .recipe-settings {
            width: 250px;
            padding-left: 2rem;
            margin-left: 2rem;
            border-left: 1px solid var(--c-border);
            flex-shrink: 0;
            @media (max-width: 1080px) {
                display: none;
            }

            .form-switch {
                display: block;
                line-height: 1.2rem;
                margin: 0.2rem 0;
                min-height: 1.4rem;
                padding: 0.1rem 0.4rem 0.1rem 2rem;
                position: relative;

                input {
                    clip: rect(0, 0, 0, 0);
                    height: 1px;
                    margin: -1px;
                    overflow: hidden;
                    position: absolute;
                    width: 1px;
                    &:focus + .form-icon {
                        border-color: var(--c-brand);
                    }
                    &:checked + .form-icon {
                        background: var(--c-brand);
                        border-color: var(--c-brand);
                        &::before {
                            left: 12px;
                        }
                    }
                }

                .form-icon {
                    border: 1px solid var(--c-border);
                    cursor: pointer;
                    display: inline-block;
                    position: absolute;
                    transition: background .2s, border .2s, box-shadow .2s, color .2s;

                    background: var(--c-bg);
                    border-radius: 0.45rem;
                    height: 0.9rem;
                    left: 0;
                    top: 0.25rem;
                    width: 1.6rem;

                    &::before {
                        background: var(--c-text);
                        border-radius: 50%;
                        content: "";
                        display: block;
                        height: 0.7rem;
                        left: 1px;
                        position: absolute;
                        top: 0;
                        transition: background .2s, border .2s, box-shadow .2s, color .2s, left .2s;
                        width: 0.7rem;
                    }
                }
            }

            .scale {
                margin-top: 2rem;

                .scale-items {
                    display: flex;
                    margin-top: 0.5rem;
                    .scale-item {
                        display: inline-block;
                        width: 2.5rem;
                        height: 2.5rem;
                        line-height: calc(2.5rem - 2px);
                        text-align: center;
                        cursor: pointer;
                        font-size: 1rem;
                        border: 1px solid var(--c-brand);
                        transition: background .2s, border .2s, box-shadow .2s, color .2s;
                        &:hover {
                            background: var(--c-brand);
                        }
                        &.active {
                            background: var(--c-brand);
                        }
                    }
                }
            }

            .variants {
                margin-top: 2rem;
                &>ul {
                    list-style: none;
                    font-size: 14px;
                    margin: 1rem 0;
                    padding-left: 2rem;
                }
                li {
                    cursor: pointer;
                    margin: 0 0 0.5rem;
                    position: relative;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    &:hover {
                        color: var(--c-brand);
                    }
                    .icon {
                        display: none;
                    }
                }
                li.active .icon {
                    display: block;
                    position: absolute;
                    left: -1.5rem;
                    height: 1.5rem;
                    color: var(--c-brand);
                }
            }
        }
    }

}
.background {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 45%;
    max-width: 65vh;
    min-width: 40vh;
    padding-left: 6px;

    .mask {
        background: linear-gradient(90deg, #2E3440 2%, #2E3440D9 30%, #2E344088 100%);
        backdrop-filter: blur(6px);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    @media (max-width: 1024px) {
        max-width: unset;
        min-width: unset;
        width: 60%;
    }

    @media (max-width: 720px) {
        max-width: unset;
        min-width: unset;
        left: 0;
        padding-left: 0;
        width: 100%;
    }

    &>img {
        height: 100%;
        object-fit: cover;
        object-position: left;

        @media (max-width: 720px) {
            object-position: center;
        }
    }
}
</style>
