<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="scss">
html, body {
    font-family: 'Roboto', sans-serif;
    position: relative;
    min-height: 100%;
}

body div#app {
    padding: 56px 0 0 0;
}
</style>
