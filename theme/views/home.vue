<template>
    <div class="home">
        <HeroBanner>
            <ul class="home__actions">
                <li v-for="item in actions" :key="item.text">
                    <NavLink
                        class="button"
                        v-if="item.text && item.link"
                        :href="item.link"
                    >
                        {{item.text}}
                    </NavLink>
                </li>
            </ul>
        </HeroBanner>

        <!-- <article>
            <div class="container--grey-lighter" v-if="data.testimonial">
                <div class="container">
                    <Testimonial :title="data.testimonial.title" :details="data.testimonial.details"></Testimonial>
                </div>
            </div>

            <div class="container container--padded" v-if="data.features && data.features.length">
                <Features :items="data.features"></Features>
            </div>

        </article> -->
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { usePageFrontmatter } from '@vuepress/client';
import HeroBanner from '../components/hero.vue';

export default defineComponent({
    name: 'Home',
    components: {
        HeroBanner,
    },
    setup() {
        return {
            actions: [],
        };
    },
});
</script>
