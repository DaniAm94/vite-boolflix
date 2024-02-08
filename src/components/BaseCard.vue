<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    name: 'Base Card',
    props: {
        element: Object
    },
    computed: {
        hasFlag() {
            const flags = ['en', 'it', 'de', 'ja', 'ko', 'cn', 'pl', 'es', 'ru', 'pt', 'tr', 'fr'];
            return flags.includes(this.element.language);
        },
        imgPath() {
            const url = new URL(`../assets/img/${this.element.language}.png`, import.meta.url);
            return url.href;
        },
        posterPath() {
            if (!this.element.poster.includes('null'))
                return this.element.poster;
            else {
                const url = new URL(`../assets/img/poster-placeholder.png`, import.meta.url);
                return url.href;
            }
        },
        fullStars() {
            return Math.floor(this.element.vote * 5 / 10);
        },
        emptyStars() {
            return 5 - this.fullStars;
        }
    },
    components: { FontAwesomeIcon }
}
</script>

<template>
    <div class="card">
        <img :src="posterPath" :alt="element.name">
        <ul class="card-info bg-black list-unstyled mb-0 ">
            <li><strong>Titolo:</strong> {{ element.title }}</li>
            <li><strong>Titolo originale:</strong> {{ element.originalTitle }}</li>

            <li class="d-flex align-items-center column-gap-3"><strong>Lingua:</strong>
                <img class="img-fluid flag" v-if="hasFlag" :src="imgPath" :alt="element.language">
                <span v-else>{{ element.language.toUpperCase() }}</span>
            </li>
            <li>
                <FontAwesomeIcon class="star" v-for="(star, i) in fullStars" :key="i" icon="fas fa-star" />
                <FontAwesomeIcon class="star" v-for="(star, i) in emptyStars" icon="far fa-star" />

            </li>
        </ul>
    </div>
</template>

<style scoped>
.card {


    .card-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 1rem;
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
        /* -------- */

        transition: height 1s, color 2s, padding 1s;

        strong {
            color: red;
        }

        .star {
            color: yellow
        }
    }

    &:hover>.card-info {
        height: 100%;
        padding: 30px;
        color: white;
    }


}

li>img.flag {
    max-height: 20px;
}
</style>