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
    setGenre(genre) {
      store.selectedGenre = genre;
    },

    /*
      Metodo che raccoglio 20 produzioni il cui tipo dipende dall'endpoint;
       la collection stabilisce la chiave dello store in cui inserirle;
        il title key cattura il titolo della singola produzione la cui chiave cambia se si tratta di film o serie
        filtra anche per genere se ne è stato selezionato uno
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
      /*  Oppure  
      const params = {
          query,
          api_key: apiKey,
          language
        }

        axios.get(`${apiUri}search/movie`, { params })
      */

      axios.get(`${apiUri}/${endpoint}`, apiConfig).then(res => {
        // Se non è stato selezionato alcun genere prende tutti il risultati della chiamata con un map
        if (!store.selectedGenre) {
          store[collection] = res.data.results.map(mapProductions)
        } else {
          /* 
          Altrimenti prende solo quelli che hanno un match positivo con il genere selezionato
           con un reduce (non uso il filter per non prelevare attributi che non mi interessano)
           */
          store[collection] = res.data.results.reduce((result, production) => {
            if (production.genre_ids.includes(store.selectedGenre)) {

              result.push({
                id: production.id,
                title: production.title || production.name,
                originalTitle: production.original_title || production.original_name,
                language: production.original_language,
                vote: production.vote_average,
                poster: api.apiPosterUri + production.poster_path,
                plot: production.overview,
                releaseDate: production.release_date
              })
            }
            return result;
          }, [])
        }
      }).catch(err => {
        console.error(err)
      })
    },
    // Metodo che raccoglie 20 produzioni (sia film che serie) filtrate solo per il genere scelto
    fetchApiPerGenre(endpoint, collection) {
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
    // Metodo per ottenere 20 film e seriet TV
    fetchMoviesAndSeries() {

      store.hasSearched = true;
      /* 
      se il filtro di ricerca per titolo è vuoto 
      e non è stato selezionato alcun genere svuota gli array movies e series e fermati
      */
      if (!store.titleFilter && !store.selectedGenre) {
        store.movies = [];
        store.series = [];
        return;
      }
      // Se è stato selezionato un genere ma non un filtro per titolo
      // Fa la ricerca solo per genere
      else if (!store.titleFilter && store.selectedGenre) {
        this.fetchApiPerGenre('discover/movie', 'movies');
        this.fetchApiPerGenre('discover/tv', 'series');
      }
      //  Altrimenti: se c'è un filtro per titolo 
      else {
        this.fetchApiByQuery('search/movie', 'movies');
        this.fetchApiByQuery('search/tv', 'series');
      }
    },
    fetchGenres() {
      const { apiUri, apiKey } = api;
      const apiConfig = {
        params: {
          api_key: apiKey,
        }
      }
      axios.get(`${apiUri}/genre/movie/list`, apiConfig).then(res => {
        store.movieGenres = res.data.genres;
      }).catch(err => {
        console.error(err)
      })
      axios.get(`${apiUri}/genre/tv/list`, apiConfig).then(res => {
        store.seriesGenres = res.data.genres;
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created() {
    this.fetchGenres();
  }
}
</script>

<template>
  <AppHeader @submitSearch="fetchMoviesAndSeries" @changeQuery="setTitleFilter" @changeGenre="setGenre" />
  <AppMain :movies="store.movies" :series="store.series" />
</template>

<style lang="scss">
@use './assets/scss/style.scss'
</style>
