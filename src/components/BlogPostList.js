import axios from "axios"
import React from 'react'

import { HTMLDecode, FormatDateTime } from '../utils/utils'
import ThumbGrid from './ThumbGrid'

const blogBaseURL = "https://blog.argcv.com/wp-json"
const blogV2BaseURL = blogBaseURL + "/wp/v2"
const postURL = blogV2BaseURL + "/posts"
const pageURL = blogV2BaseURL + "/pages"
const mediaURL = blogV2BaseURL + "/media/"


export function GetBlogPost(id, andThen, orFailed) {
    let url = postURL + '/' + id
    console.log("url:", url)
    axios.get(url)
        .then(res => andThen(res.data))
        .catch(e => {
            if(orFailed) {
                orFailed(e)
            }
        })
}

export function GetBlogPage(id, andThen, orFailed) {
    let url = pageURL + '/' + id
    console.log("url:", url)
    axios.get(url)
        .then(res => andThen(res.data))
        .catch(e => {
            if(orFailed) {
                orFailed(e)
            }
        })
}

export default class BlogPostList extends React.Component {
    constructor(props) {
        super(props)
        let posts = []
        let { title } = props
        this.state = {
            title: title,
            posts: posts,
        }
    }

    componentWillMount() {
    }
    
    componentWillReceiveProps(props) {
        // let posts = []
        // let { title } = props
        // this.setState({
        //     title: title,
        //     posts: posts,
        // })
        // this.fetchData()
    }
    
    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        let blogResp = await axios.get(postURL)
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
        let mediaResURL = mediaURL + mediaId
        let mediaSourceURL = await axios.get(mediaResURL)
            .then(res => res.data.source_url)
            .catch(function (error) {
                console.log("error", error)
                return ""
            })
        post.media_source_url = mediaSourceURL
        return post
    }

    render() {
        let posts = this.state.posts
        return (
            <div>
                <h1>{this.state.title}</h1>
                { this.state.title ? <hr/> : null}
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