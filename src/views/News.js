import React from 'react'
import BlogPostList from '../components/BlogPostList'

import { HostTitle } from '../components/SiteSignatureText'


export default ({ match }) => (
    <div>
        <HostTitle  suffix="News" />
        <BlogPostList title="Recent Blogs" />
    </div>
)