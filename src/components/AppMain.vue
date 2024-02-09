<script>
import DisplayList from './DisplayList.vue';
export default {
    name: 'App Main',
    props: {
        movies: Array,
        series: Array
    },
    components: {
        DisplayList
    }
}
</script>

<template>
    <main v-if="movies.length">
        <div class="container-sm">

            <DisplayList id="movies" :listTitle="'Film'" :list="movies" :section="'movie'" class="mb-5" />
            <DisplayList id="series" :listTitle="'Serie'" :list="series" :section="'tv'" />
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

main {
    height: calc(100vh - 120px);
    padding: 100px 0;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
}
</style>