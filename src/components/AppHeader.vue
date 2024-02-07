<script>
import SearchBar from './SearchBar.vue';
export default {
    name: 'App Header',
    components: { SearchBar },
    emits: ['submitSearch']
}
</script>

<template>
    <header class="bg-primary d-flex justify-content-between align-items-center">
        <h1>Header</h1>


        <SearchBar @submitText="$emit('submitSearch', $event)" :placeholder="'Cerca film...'" />



    </header>
</template>

<style></style>