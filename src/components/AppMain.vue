<script>
import DisplayList from './DisplayList.vue';
import { store } from '../assets/data/store';
export default {
    name: 'App Main',
    data: () => ({ store }),
    props: {
        movies: Array,
        series: Array,
    },
    components: {
        DisplayList
    }
}
</script>

<template>
    <main>
        <div v-if="store.hasSearched" class="container-sm">

            <DisplayList id="movies" :listTitle="'Film'" :list="movies" :section="'movie'" class="mb-5" />
            <DisplayList id="series" :listTitle="'Serie'" :list="series" :section="'tv'" />
        </div>
        <div v-else class="background h-100 "></div>
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

main {
    height: calc(100vh - 120px);
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;

    .container-sm {
        padding: 100px 0;
    }

    .background {
        background-image: url('../assets/img/cinema-bg.avif');
        background-size: cover;
        background-position: bottom;
    }
}
</style>