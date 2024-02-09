<script>
import ProductionCard from './ProductionCard.vue';
export default {
    name: 'Display list',
    props: {
        listTitle: String,
        list: Array,
        section: String
    },
    components: {
        ProductionCard
    }
}
</script>

<template>
    <section>
        <h2 class="section-title">{{ listTitle }}</h2>
        <div class="row row-cols-5 row-gap-4">
            <div v-for="(media, i) in list" :key="media.id" class="col">
                <ProductionCard :element="media" :endpoint="section" />
            </div>
        </div>
    </section>
</template>

<style scoped>
.section-title {
    color: white;
}
</style>