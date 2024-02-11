<script>
import axios from 'axios'
import { api } from '../assets/data/'
import CardOffcanvas from './CardOffcanvas.vue';
export default {
    name: 'Production Card',
    data: () => ({ cast: [], genres: [], showMore: false }),
    components: { CardOffcanvas },
    props: {
        element: Object,
        endpoint: String

    },
    computed: {
        hasFlag() {
            const flags = ['en', 'it', 'de', 'ja', 'ko', 'cn', 'pl', 'es', 'ru', 'pt', 'tr', 'fr', 'sv', 'tl', 'zh', 'ca'];
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
        starVote() {
            return Math.round(this.element.vote / 2);
        }
    },
    mounted() {
        this.cast = this.fetchProductionDetails('/credits', 'cast');
        this.genres = this.fetchProductionDetails('', 'genres');
    },
    methods: {
        // Metodo che raccoglie cast o generi di un film
        fetchProductionDetails(credits, info) {
            const { apiUri, apiKey } = api;
            axios.get(`${apiUri}/${this.endpoint}/${this.element.id}${credits}?api_key=${apiKey}`).then(res => {
                if (info === 'genres') {

                    this[info] = res.data[info].map(element => {
                        return element.name
                    })
                } else {
                    let fullCast = res.data[info].map(element => {
                        return element.name;
                    });
                    this[info] = fullCast.slice(0, 5);
                }
            }).catch(err => {
                console.error(err)
            })
        },
        openOffcanvas() {
            this.showMore = true;
        }
    }
}
</script>

<template>
    <div class="card">
        <div class="card-inner">

            <img :src="posterPath" :alt="element.title">
            <ul class="card-info list-unstyled mb-0 ">
                <li role="button" class="offcanvas-trigger" @click="openOffcanvas">
                    <FontAwesomeIcon icon="plus" />
                </li>
                <li><strong>Titolo</strong> {{ element.title }}</li>
                <li v-if="element.title !== element.originalTitle"><strong>Titolo originale</strong> {{
                    element.originalTitle
                }}</li>

                <li><strong>Lingua</strong>
                    <img class="img-fluid flag mt-2" v-if="hasFlag" :src="imgPath" :alt="element.language">
                    <span v-else>{{ element.language.toUpperCase() }}</span>
                </li>
                <li>
                    <FontAwesomeIcon class="star" v-for="n in 5" :key="n" :icon="[n <= starVote ? 'fas' : 'far', 'star']" />
                </li>
                <li v-if="cast && cast.length">
                    <strong>Cast</strong>
                    <ul class="list-unstyled">
                        <li v-for="(actor, i) in cast" :key="i">{{ actor }}</li>
                    </ul>
                </li>
                <li v-if="genres && genres.length">
                    <strong>Genere</strong>
                    <ul class="list-unstyled">
                        <li v-for="(genre, i) in genres" :key="i">{{ genre }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <CardOffcanvas @close-offcanvas="showMore = false" v-if="showMore" :production="element" :lang-img="imgPath"
        :vote="starVote" :genres="genres" :cast="cast" :poster-path="posterPath" />
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

.card {
    height: 364px;
    perspective: 1000px;
    background-color: transparent;

    &:hover>.card-inner {
        transform: rotateY(180deg);
    }

    .card-inner {
        height: 100%;
        width: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.8s;
        border-radius: 10px;

        >img,
        >.card-info {
            position: absolute;
            height: 100%;
            width: 100%;
            backface-visibility: hidden;
            border-radius: 10px;
        }

        >img {
            object-fit: cover;
            object-position: center top;
        }

        .card-info {
            font-size: 0.8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 1rem;
            color: white;
            background-color: $black;
            overflow-y: scroll;
            transform: rotateY(180deg);
            padding: 20px 10px;
            border: 2px groove $red ;


            /* Per nascondere la scrollbar */
            -ms-overflow-style: none;
            scrollbar-width: none;
            /* -------- */


            strong {
                color: $red;
                display: block;
            }

            .star {
                color: yellow
            }

            li {
                text-align: center;
            }

        }




    }
}

li>img.flag {
    max-height: 20px;
}

.offcanvas-trigger {
    position: absolute;
    top: 10px;

    right: 10px;

    &:hover {
        transform: scale(1.3);
    }
}
</style>