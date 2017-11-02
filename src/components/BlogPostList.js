import axios from "axios"
import React from 'react'

import { HTMLDecode, FormatDateTime } from '../utils/utils'
import ThumbGrid from './ThumbGrid'

const blogBaseUrl = "https://blog.argcv.com/wp-json"
const blogV2BaseUrl = blogBaseUrl + "/wp/v2"
const blogURL = blogV2BaseUrl + "/posts"
const mediaUrl = blogV2BaseUrl + "/media/"


export default class BlogPostList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentWillMount() {
        axios.get(blogURL)
            .then(res => {
                let posts = res.data.slice(0, 9)
                this.setState({ posts })
                posts.map((item, i) => this.requireMedia(i, item.featured_media))
            })
    }

    requireMedia(postid, mediaId) {
        let posts = this.state.posts
        posts[postid].media_source_url = ""
        this.setState({ posts })
        let mediaResUrl = mediaUrl + mediaId
        axios.get(mediaResUrl)
            .then(res => {
                let url = res.data.source_url
                let posts = this.state.posts
                posts[postid].media_source_url = url
                this.setState({ posts })
            }).catch(function (error) {
            })
    }

    render() {
        let posts = this.state.posts
        return (
            <div>
                <h1>Recent Posts</h1>
                <ThumbGrid cards={[...posts.map((item, i) => ({
                    link: item.link,
                    title: HTMLDecode(item.title.rendered),
                    content: HTMLDecode(item.excerpt.rendered),
                    thumb: item.media_source_url,
                    stamp: FormatDateTime(item.date)
                }))]} />
            </div>
        )
    }
}