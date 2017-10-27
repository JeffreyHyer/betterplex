<template>
    <div>
        <div v-if="movie">
            <nav class="navbar fixed-top bg-primary">
                <router-link to="/">
                    <span class="navbar-text" style="color: white;">
                        <svg style="width: 24px; height: 24px; vertical-align: bottom; margin-right: 0.75rem;" viewBox="0 0 24 24">
                            <path fill="#FFFFFF" d="M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z" />
                        </svg>

                        {{ movie.title }}
                    </span>
                </router-link>
            </nav>

            <br>

            <div class="container" id="movie">
                <div class="row">
                    <div class="col-4">
                        <img :src="tmdb.getPosterUrl(movie.poster_path)" width="100%" />
                    </div>

                    <div class="col-8">
                        <h5>{{ movie.title }}</h5>
                        
                        <div class="tags">
                            <span class="tag" v-for="tag in movie.genres">{{ tag.name }}</span>
                        </div>

                        <div class="tags">
                            <span class="certification">
                                <img :src="certification" height="28px" />
                            </span>
                        </div>

                        <div class="tags">
                            <span class="rating">{{ movie.vote_average }}⭐ ({{ movie.vote_count }} votes)</span>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <span class="title">Summary</span>

                        <span class="overview">
                            {{ movie.overview }}
                        </span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <span class="title">Cast</span>
                    </div>
                </div>

                <div class="row cast" v-for="c in cast" :key="c.id">
                    <div class="col-3">
                        <div class="img-wrapper">
                            <img v-show="(c.profilePath !== '')" :src="tmdb.getProfileUrl(c.profile_path)" />
                        </div>
                    </div>

                    <div class="col-9">
                        <span class="character-name">{{ c.character }}</span>
                        <span class="cast-name">{{ c.name }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- TODO: Everything about this -->
        <div v-else>
            <div style="width: 100%; height: 100%; vertical-align: middle; text-align: center;">
                Loading...
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MovieDetail',

    data () {
        return {
            loading: true,  // TODO: Use to show a loading screen/spinner until the data is available
            movie: null,

            tmdb: null
        }
    },

    props: {},

    computed: {
        certification () {
            let usa = this.movie.release_dates.results.find((r) => (r.iso_3166_1 === 'US'))
            let release = usa.release_dates.find((c) => (c.certification !== ''))

            if (release && release.certification) {
                /* eslint-disable indent */
                switch (release.certification) {
                    case 'G':
                        return require('../../src/assets/rating_g.svg')

                    case 'PG':
                        return require('../../src/assets/rating_pg.svg')

                    case 'PG-13':
                        return require('../../src/assets/rating_pg13.svg')

                    case 'R':
                        return require('../../src/assets/rating_r.svg')

                    case 'NC-17':
                        return require('../../src/assets/rating_nc17.svg')

                    case 'NR':
                    default:
                        return require('../../src/assets/rating_nr.svg')
                }
            }
        },

        cast () {
            return this.movie.credits.cast.slice(0, 10)
        }
    },

    methods: {
        getData () {
            if (this.$route.params.movieId) {
                this.tmdb.movie(this.$route.params.movieId, {append_to_response: ['video', 'release_dates', 'credits', 'images', 'keywords', 'recommendations', 'similar']})
                    .then((r) => {
                        this.movie = r.data
                        this.loading = false
                    })
            }
        }
    },

    created () {
        this.tmdb = window.tmdb

        this.getData()
    }
}
</script>

<style scoped lang="scss">
$blue: #157FFC;
$gray: #cccccc;
$darkGray: darken($gray, 10%);

#movie {
    .tags {
        margin: 0.875rem 0;

        .tag {
            display: inline-block;
            font-size: 0.6875rem;
            background: $darkGray;
            color: white;
            padding: 0.4rem 0.5rem 0.33rem;
            margin: 0 0.25rem 0.25rem 0;
            border-radius: 3px;
            text-transform: uppercase;
            line-height: 1;


            &:first-of-type {
                margin-left: 0;
            }
        }

        .certification {
            display: inline-block;
            width: 100%;
        }

        .rating {
            display: inline-block;
            width: 100%;
        }
    }

    .title {
        font-size: 0.75rem;
        text-transform: uppercase;
        font-weight: bold;
        margin-top: 1rem;
    }

    .overview {
        display: block;
        width: 100%;
        text-align: justify;
        margin-bottom: 1rem;
    }

    .cast {
        margin-bottom: 1rem;

        .img-wrapper {
            width: 60px;
            height: 60px;
            position: relative;
            overflow: hidden;
            border-radius: 50%;

            img {
                display: inline-block;
                margin: 0 auto;
                width: 100%;
                height: auto;
            }
        }

        .character-name {
            font-weight: bold;
            font-size: 1.125rem;
            display: block;
        }

        .cast-name {
            color: $gray;
            display: block;
            margin-top: 0.25rem;
            font-size: 0.875rem;
        }
    }
}
</style>
