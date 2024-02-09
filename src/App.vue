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
    fetchApi(endpoint, collection) {

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
        this.fetchAllMoviesCast();
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
      this.fetchApi('search/movie', 'movies', 'title');
      this.fetchApi('search/tv', 'series', 'name');
    },
    fetchCastPerId(id) {
      const { apiUri, apiKey } = api;

      axios.get(`${apiUri}/movie/${id}/credits?api_key=${apiKey}`).then(res => {
        store.casts[id] = res.data.cast.filter((actor, i) => i < 5)
        // store.casts[id] = res.data.cast.map(actor => {
        //   return actor.name;
        // })
      }).catch(err => {
        console.error(err)
      })
    },
    fetchAllMoviesCast() {
      store.movies.forEach(movie => {
        this.fetchCastPerId(movie.id)
      })
    }
  }
}
</script>

<template>
  <AppHeader @submitSearch="fetchMoviesAndSeries" @changeQuery="setTitleFilter" />
  <AppMain :movies="store.movies" :series="store.series" />
</template>

<style lang="scss">
@use './assets/scss/style.scss'
</style>
