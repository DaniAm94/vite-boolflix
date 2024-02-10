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
    background-color: transparent;
    box-shadow: 0 0 10px $light-red inset;
}

h1 {
    animation: small-glow-text 1s ease-in-out infinite alternate;
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
        border-radius: 20%;
        background-image: radial-gradient(#71321d, #ffd3c4);
        animation: small-glow 1s ease-in-out infinite alternate;
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

    @keyframes small-glow-text {
        from {
            text-shadow: 0 0 2px #fff, 0 0 4px #fff, 0 0 6px $red, 0 0 8px $red, 0 0 10px $red;
        }

        to {
            text-shadow: 0 0 4px #fff, 0 0 6px $light-red, 0 0 8px $light-red, 0 0 10px $light-red, 0 0 12px $light-red;

        }

    }

    @keyframes small-glow {
        from {
            box-shadow: 0 0 3px #fff, 0 0 6px #fff, 0 0 9px $red, 0 0 12px $red, 0 0 15px $red;
        }

        to {
            box-shadow: 0 0 6px #fff, 0 0 9px $light-red, 0 0 12px $light-red, 0 0 15px $light-red, 0 0 18px $light-red;

        }

    }

    img {
        width: 40px;
    }

}
</style>