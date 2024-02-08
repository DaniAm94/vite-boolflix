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
    <section>
        <h2 class="section-title">{{ listTitle }}</h2>
        <div class="row row-cols-5 row-gap-4">
            <div v-for="media in list" :key="media.id" class="col">
                <BaseCard :element="media" />
            </div>
        </div>
    </section>
</template>

<style scoped>
.section-title {
    color: white;
}
</style>