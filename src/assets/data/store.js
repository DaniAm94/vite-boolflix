import { reactive } from 'vue';

export const store = reactive({
    movies: [],
    series: [],
    movieGenres: [],
    seriesGenres: [],
    titleFilter: '',
    selectedGenre: '',
    hasSearched: false,
})