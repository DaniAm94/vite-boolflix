<script>
export default {
    name: 'Card Offcanvas',
    data: () => ({
    }),
    emits: ['closeOffcanvas'],
    props: {
        production: Object,
        posterPath: String,
        vote: Number,
        langImg: String,
        cast: Array,
        genres: Array
    },
    computed: {
        castAsString() {
            return this.cast.toString();
        },
        genresAsString() {
            return this.genres.toString();
        }
    }
}
</script>
  
<template>
    <div class="overlay">

        <div class=" offcanvas offcanvas-bottom show" tabindex="-1">
            <div class="offcanvas-header">

                <figure>

                    <img :src="posterPath" alt="placeholder">
                </figure>


                <button @click="$emit('closeOffcanvas')" type="button" class="btn-close"
                    data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body container-fluid ">

                <div class="row">
                    <div class="col-8">
                        <ul class="list-unstyled">
                            <li>
                                <h5 class="offcanvas-title">
                                    {{ production.title }}
                                </h5>
                            </li>
                            <li v-if="production.title !== production.originalTitle">
                                <h5 class="offcanvas-title">
                                    {{ production.originalTitle }}
                                </h5>
                            </li>
                            <li v-if="castAsString">
                                <strong>Cast: </strong>
                                <span>{{ castAsString }}</span>
                            </li>
                        </ul>

                    </div>
                    <div class="col-4 text-center">
                        <ul class="list-unstyled">

                            <li>
                                <FontAwesomeIcon class="star" v-for="n in 5" :key="n"
                                    :icon="[n <= vote ? 'fas' : 'far', 'star']" />
                            </li>
                            <li>
                                <img class="flag-img" :src="langImg" alt="">
                            </li>
                            <li>
                                {{ production.releaseDate }}
                            </li>
                            <li v-if="genresAsString">
                                <strong>Generi: </strong>
                                <span>{{ genresAsString }}</span>
                            </li>

                        </ul>

                    </div>
                </div>
                <p>
                    {{ production.plot }}
                </p>


            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/vars' as *;

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #0000009a;
    z-index: 2;
}

.offcanvas.offcanvas-bottom {
    right: auto;
    left: 50%;
    translate: -50%;
    border: 3px groove $red;
    border-bottom: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: $black-transparent;
    color: white;
    height: calc(100vh - 120px);
    width: 500px;

    .offcanvas-header {
        padding: 0;

        figure {
            width: 100%;
        }

        img {
            width: 100%;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        .btn-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background-color: $red;
        }
    }
}

.offcanvas-body {
    /* Per nascondere la scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
    /* -------- */
}

ul li {
    margin-bottom: 10px;
}

.star {
    color: yellow;
}

h5 {
    font-size: 1.1rem;
    color: $light-red;
}

strong {
    color: #777;
}

span {
    font-size: 0.8rem;
}

p {
    font-size: 0.9rem;
    margin-bottom: 0;
}

.flag-img {
    max-height: 20px;
}
</style>