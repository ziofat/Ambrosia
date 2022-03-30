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

        <RecipeFinder />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import HeroBanner from '../components/hero.vue';
import RecipeFinder from '../components/recipe-finder.vue';
import NavLink from '../components/nav-link.vue';

export default defineComponent({
    name: 'Home',
    components: {
        HeroBanner,
        RecipeFinder,
        NavLink,
    },
    setup() {
        return {
            actions: [],
        };
    },
});
</script>
