<script>
import DisplayList from './DisplayList.vue';
export default {
    name: 'App Main',
    props: {
        movies: Array
    },
    components: {
        DisplayList
    }
}
</script>

<template>
    <main>
        <DisplayList :listTitle="'Movies'" :list="movies" />
    </main>
</template>

<style></style>