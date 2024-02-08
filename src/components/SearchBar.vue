<script>
export default {
    name: 'Search Bar',
    data: () => ({
        searchText: ''
    }),
    props: {
        placeholder: String,
    },
    emits: ['submitText', 'changeText'],
    methods: {
        clearForm() {
            this.searchText = '';
        }
    }
}
</script>

<template>
    <form @submit.prevent="$emit('submitText')">
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

    input {
        background-color: $black;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
        border-color: white;
        padding-left: 15px;
        color: white;
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