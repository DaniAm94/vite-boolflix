<script>
import { store } from '../assets/data/store';
export default {
    name: 'Search Bar',
    data: () => ({
        searchText: '',
        selectedGenre: ''
    }),
    props: {
        placeholder: String,
    },
    emits: ['submitSearch', 'changeText', 'changeGenre'],
    computed: {
        genres() {
            const combinedGenres = [...store.movieGenres, store.seriesGenres];
            const uniqueGenresList = combinedGenres.reduce((list, genre) => {
                if (!list.some(item => item.id === genre.id)) list.push({ value: genre.id, text: genre.name });
                return list;
            }, []);
            return uniqueGenresList;
        }
    },
    methods: {
        clearForm() {
            this.searchText = '';
            this.$emit('changeText', this.searchText)
        }
    }
}
</script>

<template>
    <form @submit.prevent="$emit('submitSearch')">
        <select v-model="selectedGenre" @change="$emit('changeGenre', selectedGenre)">
            <option selected value="">Genere...</option>
            <option v-for="genre in genres" :value="genre.value">{{ genre.text }}</option>
        </select>
        <input v-model="searchText" @keyup="$emit('changeText', searchText)" @click="clearForm" type="text"
            :placeholder="placeholder || 'Scrivi...'">
        <button class="btn border text-white">
            <FontAwesomeIcon class="icon" icon="magnifying-glass" />
        </button>
    </form>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;


form {
    display: flex;


    * {
        height: 34px;
    }

    select {
        background-color: $black;
        color: white;
        border-width: 2px;
        border-radius: 10px;
        border-style: outset;
        padding: 4px 15px;

        &:active,
        &:hover {
            border-style: inset;
        }
    }

    input {
        background-color: $black;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
        border-color: white;
        padding-left: 15px;
        color: white;
        margin-left: 2rem;
    }

    button {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

        .icon {
            height: 20px;
        }
    }
}
</style>