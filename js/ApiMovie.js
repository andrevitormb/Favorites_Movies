export class ApiMovie{
    static search(movie){
        const endpoint = `http://www.omdbapi.com/?t=${movie}&apikey=d0ab3faa`

        return fetch(endpoint)
        .then(data => data.json())
        .then(({Title,Released,Poster,imdbRating}) => ({
            Title,
            Released,
            Poster,
            imdbRating
        }))
    }
}