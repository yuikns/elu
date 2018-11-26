import React from 'react'
import Loadable from 'react-loadable'

import NotMatched from 'views/NotMatched'
import PoweredBy from 'views/PoweredBy'

const Home = Loadable({
    loader: () => import('views/Home'),
    loading() {
        return <div></div>
    }
})

const News = Loadable({
    loader: () => import('views/News'),
    loading() {
        return <div></div>
    }
})

const About = Loadable({
    loader: () => import('views/About'),
    loading() {
        return <div></div>
    }
})

const Articles = Loadable({
    loader: () => import('views/Articles'),
    loading() {
        return <div></div>
    }
})

// const PoweredBy = Loadable({
//     loader: () => import('views/PoweredBy'),
//     loading() {
//         return <div></div>
//     }
// })

// please notice the sequence & path
const IndexRoute = [
    {
        path: "/",
        component: Home,
        exact: true,
        name: "Home",
        header: false,
        sidebar: true,
    },
    {
        path: "/news",
        component: News,
        name: "News",
        header: true,
        sidebar: true,
    },
    {
        path: "/about",
        component: About,
        name: "About",
        header: true,
        sidebar: true,
    },
    {
        path: "/powered-by",
        component: PoweredBy,
        name: "PoweredBy",
        header: true,
        sidebar: true,
    },
    {
        path: "/articles/:id.c",
        component: Articles,
    },
    {
        path: "/",
        component: NotMatched,
        fallback: true,
    },
    // {
    //     redirect: true,
    //     path: "/from",
    //     to: "/to",
    // }
];

export default IndexRoute;