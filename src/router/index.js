import Vue from 'vue'
import Router from 'vue-router'
import MovieList from '@/components/MovieList'
import MovieDetail from '@/components/MovieDetail'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'MovieList',
            component: MovieList
        },
        {
            path: '/movie/:movieId',
            name: 'MovieDetail',
            component: MovieDetail
        }
    ]
})
