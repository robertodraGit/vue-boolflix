var filmApi = 'https://api.themoviedb.org/3/search/movie?api_key=52d4b96c01f3627af936fa42e8430298&query='

var app = new Vue ({
    el: '#app',
    data: {
       filmArray: [],
       filmSelect: ''
    },

    methods: {

        searchFilm: function() {
            filmApi = filmApi + this.filmSelect;
            console.log(filmApi);
            axios.get(filmApi)
            .then(film => {
                this.filmArray = film.data.results;
            })
            filmApi = 'https://api.themoviedb.org/3/search/movie?api_key=52d4b96c01f3627af936fa42e8430298&query=';
        }

    }
})