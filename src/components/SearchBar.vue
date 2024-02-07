<script>
export default {
    name: 'Search Bar',
    data: () => ({
        searchText: ''
    }),
    props: {
        placeholder: String
    },
    emits: ['submitText'],
    methods: {
        clearForm() {
            this.searchText = '';
        }
    }
}
</script>

<template>
    <form @submit.prevent="$emit('submitText', searchText)">
        <input @click="clearForm" v-model.trim="searchText" type="text" :placeholder="placeholder || 'Scrivi...'">
        <button class="btn border text-white">Search</button>
    </form>
</template>