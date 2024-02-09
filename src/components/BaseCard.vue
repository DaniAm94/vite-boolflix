<script>
import { store } from '../assets/data/store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
    name: 'Base Card',
    data: () => ({ store }),
    props: {
        element: Object,
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
        },
        cast() {
            const currentCast = [];
            for (let key in store.casts) {
                console.log(key);
                console.log(store.casts[key])
                if (key === this.element.id) {
                    currentCast = store.casts[key]
                }
            }
            return currentCast
        }
    },
    components: { FontAwesomeIcon }
}
</script>

<template>
    <div class="card">
        <img :src="posterPath" :alt="element.name">
        <ul class="card-info bg-black list-unstyled mb-0 ">
            <li><strong>Titolo</strong> {{ element.title }}</li>
            <li v-if="!(element.title === element.originalTitle)"><strong>Titolo originale</strong> {{
                element.originalTitle
            }}</li>

            <li><strong>Lingua</strong>
                <img class="img-fluid flag mt-2" v-if="hasFlag" :src="imgPath" :alt="element.language">
                <span v-else>{{ element.language.toUpperCase() }}</span>
            </li>
            <li>
                <FontAwesomeIcon class="star" v-for="n in 5" :key="n" :icon="[n <= starVote ? 'fas' : 'far', 'star']" />
            </li>
            <li>
                <strong>Cast:</strong>

            </li>
        </ul>
    </div>
</template>

<style scoped>
.card {


    .card-info {
        font-size: 0.8rem;
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
            display: block;
        }

        .star {
            color: yellow
        }

        li {
            text-align: center;
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