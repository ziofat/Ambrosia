<template>
    <section class="hero-banner">
        <div class="hero-banner__content">
            <div class="hero-banner__text">
                <div class="logo-container">
                    <Logo />
                    <h1>{{ title }}</h1>
                </div>

                <p class="hero-banner__description">
                    {{ description }}
                </p>

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
import Logo from './logo.vue';

export default defineComponent({
    name: 'HeroBanner',
    components: {
        Logo,
    },
    setup() {
        const site = useSiteData();
        const frontMatter = usePageFrontmatter();

        const title = computed(() => site.value.title.replace('.', ' '));
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
    color: var(--c-text);
    text-align: center;
    height: 100vh;
    display: flex;
    align-items: center;
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: contain;

    &__content {
        flex: 1;
        text-align: center;
        z-index: 1;
    }

    .logo-container {
        display: inline-flex;
        margin: 0 auto;
        width: auto;
        border-bottom: 1px solid var(--c-border-dark);
        padding-bottom: 2rem;
        .logo {
            width: 200px;
            height: 200px;
            margin-right: 40px;
        }
    }
    @media (max-width: 720px) {
        .logo-container {
            flex-direction: column;
            align-items: center;
            padding-bottom: 1rem;
            .logo, h1 {
                margin: 0;
                text-align: center;
            }
        }
    }

    h1 {
        &:first-line {
            font-weight: 300;
        }
        color: inherit;
        font-weight: 300;
        margin: 0 0 0 40px;
        position: relative;
        text-align: left;
        font-size: 70px;
        line-height: 100px;
        text-transform: none;
        width: min-content;
        font-weight: 700;
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
