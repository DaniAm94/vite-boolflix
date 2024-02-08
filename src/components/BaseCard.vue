<script>
export default {
    name: 'Base Card',
    props: {
        element: Object
    },
    computed: {
        hasFlag() {
            const flags = ['en', 'it'];
            return flags.includes(this.element.language)
        },
        imgPath() {
            const url = new URL(`../assets/img/${this.element.language}.png`, import.meta.url);
            return url.href;
        },
        posterPath() {
            if (!this.element.poster.includes('null')) return this.element.poster
            else {
                const url = new URL(`../assets/img/poster-placeholder.png`, import.meta.url);
                return url.href;
            }
        }
    }
}
</script>

<template>
    <div class="card">
        <img :src="posterPath" :alt="element.name">
        <ul class="card-info bg-black list-unstyled mb-0 ">
            <li>Titolo: {{ element.title }}</li>
            <li>Titolo originale: {{ element.originalTitle }}</li>

            <li class="d-flex align-items-center column-gap-3">Lingua:
                <img class="img-fluid flag" v-if="hasFlag" :src="imgPath" :alt="element.language">
                <span v-else>{{ element.language.toUpperCase() }}</span>
            </li>
            <li>Voto: {{ Math.floor(element.vote) }}</li>
        </ul>
    </div>
</template>

<style scoped>
.card {


    .card-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0;
        color: black;
        overflow-y: scroll;
        /* Per nascondere la scrollbar */
        -ms-overflow-style: none;
        scrollbar-width: none;
        transition: height 1s, color 2s;

    }

    &:hover>.card-info {
        height: 100%;
        padding: 30px;
        color: white;
    }


}


img.flag {
    max-height: 20px;
}
</style>