import { reactive } from 'vue';

export const store = reactive({
    movies: [],
    series: [],
    titleFilter: '',
    selectedGenre: '',
    hasSearched: false,
})