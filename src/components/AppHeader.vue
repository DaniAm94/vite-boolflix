<script>
import SearchBar from './SearchBar.vue';
export default {
    name: 'App Header',
    components: { SearchBar },
    emits: ['submitSearch']
}
</script>

<template>
    <header>
        <div class="container-sm d-flex justify-content-between align-items-center">

            <h1>BoolFlix</h1>


            <SearchBar @submitText="$emit('submitSearch', $event)" :placeholder="'Cerca film e serie...'" />
        </div>



    </header>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

header {
    padding: 20px 0;
    background-color: $black;
    color: $red;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;
}
</style>