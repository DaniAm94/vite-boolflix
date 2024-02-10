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
        <div v-if="list.length" class="row row-cols-5 row-gap-4">
            <div v-for="media in list" :key="media.id" class="col">
                <ProductionCard :element="media" :endpoint="section" />
            </div>
        </div>
        <h3 class="empty-list" v-else>Nessun risultato...</h3>
    </section>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

.section-title {
    color: white;
}

.empty-list {
    color: $red;
}
</style>