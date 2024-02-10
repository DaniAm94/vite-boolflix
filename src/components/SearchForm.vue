<script>
import { genres } from '../assets/data'
export default {
    name: 'Search Bar',
    data: () => ({
        genres,
        searchText: '',
        selectedGenre: ''
    }),
    props: {
        placeholder: String,
    },
    emits: ['submitSearch', 'changeText', 'changeGenre'],
    methods: {
        clearForm() {
            this.searchText = '';
        }
    }
}
</script>

<template>
    <form @submit.prevent="$emit('submitSearch')">
        <select v-model="selectedGenre" @change="$emit('changeGenre', selectedGenre)">
            <option selected value="">Genere...</option>
            <option v-for="genre in genres" :value="genre.id">{{ genre.name }}</option>
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
        padding-left: 15px;
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