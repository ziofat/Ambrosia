<template>
    <div class="recipe-steps">
        <div class="step-header">
           材料
        </div>
        <div class="step-header">
           重量
        </div>
        <div class="step-header">
           做法
        </div>
        <slot></slot>
    </div>
</template>
<style lang="scss">
.recipe-steps {
    display: grid;
    grid-template-columns: 2fr 1fr 5fr;
    .step-header {
        font-size: 20px;
        padding: 8px 16px;
        height: 50px;
        border-bottom: 2px solid var(--c-brand);
    }

    @media (max-width: 720px) {
        display: flex;
        flex-wrap: wrap;
        .step-header {
            font-size: 0;
            flex-basis: 33%;
            height: auto;
            padding: 0;
        }
    }
}
</style>
