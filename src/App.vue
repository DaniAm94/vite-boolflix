<script>

import { store } from './assets/data/store';
import { endpointMovies } from './assets/data';
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
export default {
  name: 'App Vue',
  components: {
    AppHeader, AppMain
  },
  data: () => ({ store }),
  methods: {

    // Metodo per ottenere 20 film in base alla query che li filtra per titolo
    fetchMoviesByQuery(query) {
      store.isLoading = true;
      axios.get(endpointMovies + `?api_key=99ef5bb01d00e4a25accc86d90c0e8b1&query=${query}&language=it-IT`).then(res => {
        store.movies = res.data.results.map(movie => {
          return {
            id: movie.id,
            title: movie.title,
            originalTitle: movie.original_title,
            language: movie.original_language,
            vote: movie.vote_average
          }
        })
      }).catch(err => {
        console.error(err)
      }).then(() => {
        store.isLoading = false;
      })
    }
  },
  created() {
    this.fetchMoviesByQuery('potter');
  }
}
</script>

<template>
  <AppHeader />
  <AppMain />
</template>

<style></style>
