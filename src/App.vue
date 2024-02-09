<script>

import { store } from './assets/data/store';
import { api, mapProductions } from './assets/data';
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

    /**
     * this method set the filter to fetch productions
     * @param {String} term the filter applied to the title
     */
    setTitleFilter(term) {
      store.titleFilter = term.trim();
    },

    /*
      Metodo che raccoglio 20 produzioni il cui tipo dipende dall'endpoint;
       la collection stabilisce la chiave dello store in cui inserirle;
        il title key cattura il titolo della singola produzione la cui chiave cambia se si tratta di film o serie
     */
    fetchApiByQuery(endpoint, collection) {

      const { apiUri, apiKey, language } = api;
      const apiConfig = {
        params: {
          query: store.titleFilter,
          api_key: apiKey,
          language
        }
      }
      /* Oppure  
      const params = {
          query,
          api_key: apiKey,
          language
        }

        axios.get(`${apiUri}search/movie`, { params })
      */

      axios.get(`${apiUri}/${endpoint}`, apiConfig).then(res => {
        store[collection] = res.data.results.map(mapProductions)
      }).catch(err => {
        console.error(err)
      })
    },
    fetchApiByGenre(endpoint, collection) {
      const { apiUri, apiKey, language } = api;
      const apiConfig = {
        params: {
          with_genres: store.selectedGenre,
          api_key: apiKey,
          language
        }
      }
      axios.get(`${apiUri}/${endpoint}`, apiConfig).then(res => {
        store[collection] = res.data.results.map(mapProductions)
      }).catch(err => {
        console.error(err)
      })
    },
    // Metodo per ottenere 20 film e seriet TV in base alla query che li filtra per titolo
    fetchMoviesAndSeries() {
      // se il filtro di ricerca è vuoto svuota gli array movies e series e fermati
      if (!store.titleFilter) {
        store.movies = [];
        store.series = [];
        return;
      }
      this.fetchApiByQuery('search/movie', 'movies');
      this.fetchApiByQuery('search/tv', 'series');
    },
    fetchMovieAndSeriesPerGenre(genreId) {
      store.selectedGenre = genreId
      this.fetchApiByGenre('discover/movie', 'movies');
      this.fetchApiByGenre('discover/tv', 'series');

    }
  }
}
</script>

<template>
  <AppHeader @submitSearch="fetchMoviesAndSeries" @changeQuery="setTitleFilter"
    @changeGenre="fetchMovieAndSeriesPerGenre" />
  <AppMain :movies="store.movies" :series="store.series" />
</template>

<style lang="scss">
@use './assets/scss/style.scss'
</style>
