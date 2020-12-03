var movieApi = 'https://api.themoviedb.org/3/search/movie?api_key=52d4b96c01f3627af936fa42e8430298&query=';
var tvShowsApi = 'https://api.themoviedb.org/3/search/tv?api_key=52d4b96c01f3627af936fa42e8430298&query=';
var pageApi = '&page=';
var posterApi = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

var app = new Vue ({
    el: '#app',
    data: {
       filmArray: [],
       tvShowsArray: [],
       select: '',
       filmPage: 0,
       tvShowsPage: 0,
       filmPageTotal: 0,
       tvShowsPageTotal: 0,
       filmTotal: 0,
       tvShowsTotal: 0,
       counter: 1,
       counterTv: 1
    },

    methods: {

        searchFilm: function() {
            this.resetApi();
            movieApi = movieApi + this.select + pageApi + '1';
            axios.get(movieApi)
            .then(film => {
                this.filmArray = film.data.results;
                this.filmPage = film.data.page;
                this.filmPageTotal = film.data.total_pages;
                this.filmTotal = film.data.total_results;
                this.halfVote();
                this.flagLink();
            })            
        },

        searchTv: function() {
            tvShowsApi = tvShowsApi + this.select + pageApi + '1';
            axios.get(tvShowsApi)
            .then(tv => {
                this.tvShowsArray = tv.data.results;
                this.tvShowsPage = tv.data.page;
                this.tvShowsPageTotal = tv.data.total_pages;
                this.tvShowsTotal = tv.data.total_results;
                this.halfVoteTv();
                this.flagLinkTv();
            })
        },

        resetApi: function() {
            movieApi = 'https://api.themoviedb.org/3/search/movie?api_key=52d4b96c01f3627af936fa42e8430298&query=';
            tvShowApi = 'https://api.themoviedb.org/3/search/tv?api_key=52d4b96c01f3627af936fa42e8430298&query=';
            this.counter = 1;
            this.counterTv = 1;
        },

        flagLink: function() {
            let i = 0;
            while (i < this.filmArray.length) {
                if (this.filmArray[i].original_language === 'en') {
                    this.filmArray[i].original_language = 'us';
                }
                this.filmArray[i].original_language = 
                    'https://www.countryflags.io/' + 
                    this.filmArray[i].original_language + 
                    '/shiny/32.png';
                    i++;
            }
        },

        flagLinkTv: function() {
            let i = 0;
            while (i < this.tvShowsArray.length) {
                if (this.tvShowsArray[i].original_language === 'en') {
                    this.tvShowsArray[i].original_language = 'us';
                }
                this.tvShowsArray[i].original_language = 
                    'https://www.countryflags.io/' + 
                    this.tvShowsArray[i].original_language + 
                    '/shiny/32.png';
                    i++;
            }
        },

        halfVote: function() {
            let i = 0;
                while (i < this.filmArray.length) {
                    this.filmArray[i].vote_average = Math.round(this.filmArray[i].vote_average / 2);
                    i++;
                }
        },

        halfVoteTv: function() {
            let i = 0;
                while (i < this.tvShowsArray.length) {
                    this.tvShowsArray[i].vote_average = Math.round(this.tvShowsArray[i].vote_average / 2);
                    i++;
                }
        },

        nextPage: function() {
            if (this.counter < this.filmPageTotal) {
                movieApi = movieApi + this.select + pageApi + (++this.counter);
                axios.get(movieApi)
                .then(film => {
                    this.filmArray = film.data.results;
                    this.filmPage = film.data.page;
                    this.halfVote();
                    this.flagLink();
                })
            }
        },

        nextPageTv: function() {
            if (this.counterTv < this.tvShowsPageTotal) {
                tvShowsApi = tvShowsApi + this.select + pageApi + (++this.counterTv);
                axios.get(tvShowsApi)
                .then(tvShows => {
                    this.tvShowsArray = tvShows.data.results;
                    this.tvShowsPage = tvShows.data.page;
                    this.halfVoteTv();
                    this.flagLinkTv();
                })
            }
        },

        previousPage: function() {
            if (this.counter >= 2) {
                movieApi = movieApi + this.select + pageApi + (--this.counter);
                axios.get(movieApi)
                .then(film => {
                    this.filmArray = film.data.results;
                    this.filmPage = film.data.page;
                    this.halfVote();
                    this.flagLink();
                })
            }
        },
        
        previousPageTv: function() {
            if (this.counterTv >= 2) {
                tvShowsApi = tvShowsApi + this.select + pageApi + (--this.counterTv);
                axios.get(tvShowsApi)
                .then(tvshow => {
                    this.tvShowsArray = tvshow.data.results;
                    this.tvShowsPage = tvshow.data.page;
                    this.halfVoteTv();
                    this.flagLinkTv();
                })
            }
        }

    }
})