'use strict'

import axios from 'axios'

const config = {
    'images': {
        'base_url': 'http://image.tmdb.org/t/p/',
        'secure_base_url': 'https://image.tmdb.org/t/p/',
        'backdrop_sizes': ['w300', 'w780', 'w1280', 'original'],
        'logo_sizes': ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
        'poster_sizes': ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
        'profile_sizes': ['w45', 'w185', 'h632', 'original'],
        'still_sizes': ['w92', 'w185', 'w300', 'original']
    },
    'change_keys': [
        'adult', 'air_date', 'also_known_as', 'alternative_titles', 'biography', 'birthday',
        'budget', 'cast', 'certifications', 'character_names', 'created_by', 'crew', 'deathday', 'episode', 'episode_number',
        'episode_run_time', 'freebase_id', 'freebase_mid', 'general', 'genres', 'guest_stars', 'homepage', 'images', 'imdb_id', 'languages',
        'name', 'network', 'origin_country', 'original_name', 'original_title', 'overview', 'parts', 'place_of_birth', 'plot_keywords',
        'production_code', 'production_companies', 'production_countries', 'releases', 'revenue', 'runtime', 'season', 'season_number',
        'season_regular', 'spoken_languages', 'status', 'tagline', 'title', 'translations', 'tvdb_id', 'tvrage_id', 'type', 'video', 'videos'
    ]
}

export default class Tmdb {
    constructor (apiKey) {
        this.client = axios.create({
            baseURL: 'https://api.themoviedb.org/3/',
            headers: {}
        })

        this.apiKey = apiKey

        this.config = config
    }

    async _get (path, params = {}) {
        const resp = await this.client.get(
            path,
            {
                params: {
                    api_key: this.apiKey,
                    ...params
                }
            }
        )

        return resp
    }

    async movie (id, params = {}) {
        let defaults = {
            language: 'en-us',
            append_to_response: []
        }

        let _params = Object.assign(defaults, params)

        _params.append_to_response = _params.append_to_response.join(',')

        return this._get(`movie/${id}`, _params)
    }

    async nowPlaying (params = {}) {
        let defaults = {
            page: 1,
            lang: 'en-us',
            region: 'US'
        }

        let _params = Object.assign(defaults, params)

        return this._get('movie/now_playing', _params)
    }

    getBackdropUrl (path, size = 'w780') {
        return this.getImageUrl(path, size)
    }

    getLogoUrl (path, size = 'w300') {
        return this.getImageUrl(path, size)
    }

    getPosterUrl (path, size = 'w780') {
        return this.getImageUrl(path, size)
    }

    getProfileUrl (path, size = 'w185') {
        return this.getImageUrl(path, size)
    }

    getStillUrl (path, size = 'w300') {
        return this.getImageUrl(path, size)
    }

    getImageUrl (path, size) {
        return `${this.config.images.secure_base_url}${size}/${path}`
    }
}
