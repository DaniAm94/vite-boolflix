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
    <main v-if="movies.length" class="container-sm">
        <DisplayList :listTitle="'Movies'" :list="movies" class="mb-5" />
        <DisplayList :listTitle="'Series'" :list="series" />
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

main {
    padding: 40px 0;
    background-color: $black;
}
</style>