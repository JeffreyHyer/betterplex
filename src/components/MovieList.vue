<!--
    TODO
    ====
    - Remember scroll position when returning from previous page
-->

<template>
    <div>
        <nav class="navbar fixed-top bg-primary">
            <span class="navbar-text" style="color: white;">New Movies</span>
        </nav>
        
        <ul id="movieList">
            <template v-for="(movie, i) in movies">
                <router-link :to="{ name: 'MovieDetail', params: { movieId: movie.id } }">
                    <li>
                        <template v-if="movie.backdrop_path">
                            <img :src="tmdb.getBackdropUrl(movie.backdrop_path)" width="100%" />

                            <div class="image-overlay">
                                <span class="title">{{ movie.original_title }}</span>
                                <span class="rating">{{ movie.vote_average }} ⭐</span>
                            </div>
                        </template>
                    </li>
                </router-link>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MovieDetail2',

    data () {
        return {
            movies: [],

            tmdb: null
        }
    },

    props: {},

    computed: {},

    methods: {
        getData () {
            this.tmdb.nowPlaying()
                .then((r) => {
                    if (r.data.results) {
                        this.movies = r.data.results
                    }
                })
        }
    },

    created () {
        this.tmdb = window.tmdb

        this.getData()
    }
}
</script>

<style scoped lang="scss">
ul#movieList {
    list-style-type: none;
    padding: 0;

    li {
        position: relative;

        div.image-overlay {
            width: 100%;
            padding: 3rem 1rem 1rem;
            background: -webkit-linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)) !important;
            position: absolute;
            bottom: 0;
            left: 0;
            color: white;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;

            span.title {
                font-size: 1.5rem;
                order: 1;
            }

            span.rating {
                text-align: right;
                order: 2;
                flex-basis: 20%;
            }
        }
    }
}
</style>
