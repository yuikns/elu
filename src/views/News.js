import React from 'react'
import ReactGA from 'react-ga'

import BlogPostList from '../components/BlogPostList'

import { HostTitle } from '../components/SiteSignatureText'


export default ({ match }) => {
    ReactGA.pageview(window.location.pathname + window.location.search)
    return (<div>
        <HostTitle suffix="News" />
        <BlogPostList title="Recent Blogs" />
    </div>)
}