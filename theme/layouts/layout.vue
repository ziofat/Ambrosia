<template>
    <div class="theme-container">
        <Navbar />

        <main class="main-content">
            <!-- <Home v-if="isHome"/>
            <Page v-else /> -->
            <Content />
        </main>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
// import Home from '../views/home.vue';
// import Page from '../views/page.vue';
import Navbar from '../components/navbar.vue';

export default defineComponent({
    components: {
        // Home,
        // Page,
        Navbar,
    },
});

</script>
<style lang="scss">
html, body {
    margin: 0;
    padding: 0;
}
body, #app {
    height: 100vh;
}
.theme-container {
    height: 100%;
    background-color: var(--c-bg);
}
</style>
<style src="../styles/index.scss" lang="scss" />
