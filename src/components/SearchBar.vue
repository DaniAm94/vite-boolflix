<script>
export default {
    name: 'Search Bar',
    data: () => ({
        searchText: ''
    }),
    emits: ['submit-text']
}
</script>

<template>
    <form @submit.prevent="$emit('submit-text', searchText)">
        <input v-model="searchText" type="text" placeholder="Scrivi...">
        <button class="btn border text-white" type="button">Search</button>
    </form>
</template>