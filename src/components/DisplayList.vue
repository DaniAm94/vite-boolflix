<script>
import BaseCard from './BaseCard.vue';
export default {
    name: 'Display list',
    props: {
        listTitle: String,
        list: Array
    },
    components: {
        BaseCard
    }
}
</script>

<template>
    <section class="container-fluid">
        <h2>{{ listTitle }}</h2>
        <div class="row row-cols-5 row-gap-4">
            <div v-for="movie in list" :key="movie.id" class="col">
                <BaseCard :element="movie" />
            </div>
        </div>
    </section>
</template>