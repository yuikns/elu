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

    }

    async componentDidMount() {
        let blogResp = await axios.get(blogURL)
        let posts = blogResp.data.slice(0, 9)
        this.setState({ posts })
        posts.forEach(async (item, i) => {
            this.requireMedia(item).then(pWithMedia =>
                this.setState(prev => {
                    let newPosts = prev.posts
                    newPosts[i] = pWithMedia
                    return {
                        posts: newPosts
                    }
                }))
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