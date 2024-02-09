<script>
import SearchBar from './SearchBar.vue';
import { store } from '../assets/data/store'
export default {
    name: 'App Header',
    data: () => ({
        store
    }),
    components: { SearchBar },
    emits: ['submitSearch', 'changeQuery']
}
</script>

<template>
    <header>
        <div class="container-sm d-flex justify-content-between align-items-center">

            <h1>BoolFlix</h1>
            <nav>
                <ul class="list-unstyled">
                    <li v-if="store.movies.length"><a href="#movies">
                            <img src="../assets/img/movie-icon.png" alt="">
                        </a></li>
                    <li v-if="store.series.length">
                        <a href="#series">
                            <img src="../assets/img/tv-icon.png" alt="">

                        </a>
                    </li>
                </ul>
            </nav>

            <SearchBar @submitText="$emit('submitSearch')" @changeText="$emit('changeQuery', $event)"
                :placeholder="'Cerca film e serie...'" />
        </div>



    </header>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

header {
    height: 120px;
    padding: 20px 0;
    background-color: transparent;
    color: $red;
    box-shadow: 0 2px 15px white;
}

nav {
    ul {
        display: flex;
        column-gap: 1rem;
    }

    a {
        display: block;
        padding: 10px;
        border-radius: 50%;
        background-image: radial-gradient(white, black);
        box-shadow: 0 2px 15px white;

    }

    img {
        width: 40px;
    }
}
</style>