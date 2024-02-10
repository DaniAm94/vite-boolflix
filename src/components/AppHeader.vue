<script>
import SearchForm from './SearchForm.vue';
import { store } from '../assets/data/store'
export default {
    name: 'App Header',
    data: () => ({
        store
    }),
    components: { SearchForm },
    emits: ['submitSearch', 'changeQuery', 'changeGenre']
}
</script>

<template>
    <header>
        <div class="container-sm d-flex justify-content-between align-items-center">

            <h1>BoolFlix</h1>
            <nav>
                <ul>
                    <li v-if="store.movies.length">
                        <a href="#movies">
                            <img src="../assets/img/movie-icon.png" alt="">
                            <span class="tooltips">Vai ai film</span>
                        </a>
                    </li>
                    <li v-if="store.series.length">
                        <a href="#series">
                            <img src="../assets/img/tv-icon.png" alt="">
                            <span class="tooltips">Vai alle serie</span>
                        </a>
                    </li>
                </ul>
            </nav>


            <SearchForm @submitSearch="$emit('submitSearch')" @changeText="$emit('changeQuery', $event)"
                @changeGenre="$emit('changeGenre', $event)" :placeholder="'Cerca film e serie...'" />
        </div>



    </header>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

header {
    display: flex;
    align-items: center;
    height: 120px;
    padding: 20px 0;
    color: $red;
    box-shadow: 0 2px 15px white inset;
}

nav {
    ul {
        display: flex;
        column-gap: 2rem;
        list-style-type: none;
        margin-bottom: 0;
    }

    a {
        display: block;
        padding: 10px;
        border-radius: 50%;
        background-image: radial-gradient(grey, white);
        box-shadow: 0 2px 15px white;
        position: relative;

        .tooltips {
            padding: 5px 0;
            text-align: center;
            border-radius: 10px;
            width: 120px;
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            visibility: hidden;
            background-color: red;
            color: white;
            opacity: 0;
            transition: opacity 500ms 500ms;
            z-index: 1;
        }

        .tooltips::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: red transparent transparent transparent;
        }

        &:hover>.tooltips {
            visibility: visible;
            opacity: 1;
        }
    }

    img {
        width: 40px;
    }

}
</style>