const api = {
    apiUri: 'https://api.themoviedb.org/3',
    apiKey: '99ef5bb01d00e4a25accc86d90c0e8b1',
    apiPosterUri: 'https://image.tmdb.org/t/p/w342',
    language: 'it-IT'
}

const mapProductions = production => ({
    id: production.id,
    title: production.title || production.name,
    originalTitle: production.original_title || production.original_name,
    language: production.original_language,
    vote: production.vote_average,
    poster: api.apiPosterUri + production.poster_path
})




export { api, mapProductions };