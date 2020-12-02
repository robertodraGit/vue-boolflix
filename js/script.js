var filmApi = 'https://api.themoviedb.org/3/search/movie?api_key=52d4b96c01f3627af936fa42e8430298&query=';
var pageApi = '&page='

var app = new Vue ({
    el: '#app',
    data: {
       filmArray: [],
       filmSelect: '',
       filmPage: 0,
       filmPageTotal: 0,
       filmTotal: 0,
       counter: 1
    },

    methods: {

        searchFilm: function() {
            filmApi = 'https://api.themoviedb.org/3/search/movie?api_key=52d4b96c01f3627af936fa42e8430298&query=';
            this.counter = 1;
            filmApi = filmApi + this.filmSelect + pageApi + '1';
            axios.get(filmApi)
            .then(film => {
                this.filmArray = film.data.results;
                this.filmPage = film.data.page;
                this.filmPageTotal = film.data.total_pages;
                this.filmTotal = film.data.total_results;
            })
        },

        nextPage: function() {
            filmApi = filmApi + this.filmSelect + pageApi + (++this.counter);
            axios.get(filmApi)
            .then(film => {
                this.filmArray = film.data.results;
                this.filmPage = film.data.page;
                this.filmPageTotal = film.data.total_pages;
                this.filmTotal = film.data.total_results;
            })
        }

    }
})