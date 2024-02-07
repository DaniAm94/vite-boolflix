<script>
export default {
    name: 'Base Card',
    props: {
        element: Object
    },
    methods: {
        createImagePath(lan) {
            const url = new URL(`../assets/img/${lan}.png`, import.meta.url);
            return url.href;
        }
    }
}
</script>

<template>
    <div class="card">
        <div class="card-info bg-black text-white p-3 d-flex flex-column justify-content-between ">
            <div>Titolo: {{ element.title }}</div>
            <div>Titolo originale: {{ element.originalTitle }}</div>

            <div class="d-flex align-items-center column-gap-3">Lingua:
                <img class="img-fluid" v-if="element.language === 'en' || element.language === 'it'"
                    :src="createImagePath(element.language)" :alt="element.language">
                <span v-else>{{ element.language.toUpperCase() }}</span>
            </div>
            <div>Voto: {{ Math.floor(element.vote) }}</div>
        </div>
    </div>
</template>

<style scoped>
.card {
    height: 200px;

    .card-info {
        height: 100%;
    }
}

img {
    max-height: 20px;
}
</style>