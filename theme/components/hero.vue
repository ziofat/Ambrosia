<template>
    <section class="hero-banner" :style="{ backgroundImage: `url(${image})`, backgroundColor: bgColor }">
        <div class="hero-banner__content">
            <div class="hero-banner__text">
                <h1>{{ title }}
                    <small v-show="version">{{version}}</small>
                </h1>

                <p class="hero-banner__description">
                    {{ description }}
                </p>

                <!-- <ul v-if="terms" class="hero-banner__terms">
                    <li v-for="term in terms" v-bind:key="term">{{term}}</li>
                </ul> -->

                <p class="hero-banner__actions">
                    <slot></slot>
                </p>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useSiteData, usePageFrontmatter } from '@vuepress/client';

export default defineComponent({
    name: 'HeroBanner',
    setup() {
        const site = useSiteData();
        const frontMatter = usePageFrontmatter();

        const title = computed(() => site.value.title);
        const description = computed(() => site.value.description);
        const image = computed(() => frontMatter.value.heroImage);
        const bgColor = computed(() => frontMatter.value.heroColor);

        return {
            title,
            description,
            image,
            bgColor,
        };
    },
});
</script>
<style lang="scss">
.hero-banner {
    position: relative;
    overflow: hidden;
    margin-top: -100px;
    color: var(--c-text);
    text-align: center;
    height: calc(70vh - 100px);
    min-height: 500px;
    display: flex;
    align-items: center;
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    padding-right: 50%;

    &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 40px;
        bottom: -40px;
        box-shadow: 0 0 40px 40px var(--c-bg);
    }

    &__content {
        flex: 1;
        text-align: center;
        z-index: 1;
    }

    h1 {
        color: inherit;
        font-weight: 300;
        margin: 10px 0 40px;
        position: relative;
        text-align: center;
        font-size: 50px;
        text-transform: none;

        .anchor span {
            color: white;
        }

        a {
            display: block;
        }

        small {
            bottom: -7px;
            bottom: -.4375rem;
            font-size: 16px;
            font-size: 1rem;
            position: absolute;
        }
    }

    &__description {
        font-size: 1.6rem;
        text-align: center;
        color: white;
        padding-bottom: 0;
        margin-bottom: 0;
    }
}
</style>
