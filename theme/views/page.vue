<template>
    <div class="page">
        <div class="page-content">
            <article class="container">
                <Content :custom="false"/>
            </article>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Page',
};
</script>
<style lang="scss">
.page {
    padding-bottom: 30px;
    word-break: break-word;
}

.page-content {
    padding-left: 80px;
    padding-right: 80px;

    ul, ol {
        margin-left: 16px;
        margin-top: 16px;
        margin-bottom: 16px;
        line-height: 24px;
    }

    ul {
        list-style: disc;
    }
    ol {
        list-style: decimal;
    }
}

a.header-anchor {
    font-size: 0.85em;
    float: left;
    margin-left: -0.87em;
    padding-right: 0.23em;
    margin-top: 0.125em;
    opacity: 0;

    &:hover {
        text-decoration: none;
    }
}

h1, h2, h3, h4, h5, h6 {
    &:hover .header-anchor {
        opacity: 1;
    }
}
</style>
