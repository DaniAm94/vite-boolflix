const api = {
    apiUri: 'https://api.themoviedb.org/3',
    apiKey: '99ef5bb01d00e4a25accc86d90c0e8b1',
    apiPosterUri: 'https://image.tmdb.org/t/p/w342',
    language: 'it-IT'
}
const genres = [
    {
        id: 16,
        name: 'Animation'
    },
    {
        id: 35,
        name: 'Comedy'
    },
    {
        id: 80,
        name: 'Crime'
    },
    {
        id: 99,
        name: 'Documentary'
    },
    {
        id: 18,
        name: 'Drama'
    },
    {
        id: 10751,
        name: 'Family'
    },
    {
        id: 9648,
        name: 'Mistery'
    },
    {
        id: 37,
        name: 'Wester'
    }
]



const mapProductions = production => ({
    id: production.id,
    title: production.title || production.name,
    originalTitle: production.original_title || production.original_name,
    language: production.original_language,
    vote: production.vote_average,
    poster: api.apiPosterUri + production.poster_path,
    plot: production.overview,
    releaseDate: production.release_date
})




export { api, mapProductions, genres };