<script>
export default {
    name: 'App Main',
    props: {
        movies: Array
    }
}
</script>

<template>
    <main>
        <ul v-for="movie in movies" :key="movie.id">
            <li>Titolo: {{ movie.title }}</li>
            <li>Titolo originale: {{ movie.originalTitle }}</li>
            <li>Lingua: {{ movie.language }}</li>
            <li>Voto: {{ movie.vote }}</li>
        </ul>
    </main>
</template>

<style></style>