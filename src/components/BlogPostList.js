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
        let posts = []
        this.state = {
            posts: posts
        }
    }

    componentWillMount() {
        axios.get(blogURL)
            .then(res => {
                let posts = res.data.slice(0, 9)
                Promise.all(posts.map((item, i) => {
                    return this.requireMedia(item)
                })).then(postsWithMediaUrl => {
                    this.setState({ posts: postsWithMediaUrl })
                })
            })
    }

    async requireMedia(post) {
        let mediaId = post.featured_media
        let mediaResUrl = mediaUrl + mediaId
        let mediaSourceUrl = await axios.get(mediaResUrl)
            .then(res => res.data.source_url)
            .catch(function (error) {
                console.log("error", error)
                return ""
            })
        post.media_source_url = mediaSourceUrl
        return post
    }

    render() {
        let posts = this.state.posts
        return (
            <div>
                <h1>Recent Posts</h1>
                <ThumbGrid cards={[...posts.map((item, i) => ({
                    link: item.link || "",
                    title: HTMLDecode(item.title.rendered),
                    content: HTMLDecode(item.excerpt.rendered),
                    thumb: item.media_source_url,
                    stamp: FormatDateTime(item.date)
                }))]} />
            </div>
        )
    }
}