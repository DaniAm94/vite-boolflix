<script>

import { store } from './assets/data/store';
import { endpointMovies, endpointSeries } from './assets/data';
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
    logEvent(string) {
      console.log(string);
    },
    // Metodo per ottenere 20 film e seriet TV in base alla query che li filtra per titolo
    fetchMoviesAndSeriesByQuery(query) {
      store.isLoading = true;
      axios.get(endpointMovies + `&query=${query}&language=it-IT`).then(res => {
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
      })
      axios.get(endpointSeries + `&query=${query}&language=it-IT`).then(res => {
        store.series = res.data.results.map(series => {
          return {
            id: series.id,
            title: series.name,
            originalTitle: series.original_name,
            language: series.original_language,
            vote: series.vote_average
          }
        })
      }).catch(err => {
        console.error(err)
      }).then(() => {
        store.isLoading = false
      })
    }
  }
}
</script>

<template>
  <AppHeader @submitSearch="fetchMoviesAndSeriesByQuery" />
  <AppMain :movies="store.movies" :series="store.series" />
</template>

<style></style>
