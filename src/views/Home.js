
import React from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'


function htmlDecode(str) {
    const parser = new DOMParser
    return parser.parseFromString('<!doctype html><body>' + str,
        'text/html').body.textContent
}

class ThumbCard extends React.Component {
    render() {
        let { i, link, thumb, title, content, stamp, ...props } = this.props
        link = link || "#"
        title = title || ""
        content = content || ""
        stamp = stamp || ""
        thumb = thumb || require('../images/logo.svg')
        return (<a href={link} className="ThumbCard" >
            <div className="thumb" style={{ "backgroundImage": `url(${thumb})` }}></div>
            <div className="content DropDown-Content">
                <h2>{title}</h2>
                <p>{content}</p>
                <span>{stamp}</span>
            </div>
        </a>)
    }
}

// Some Configurations are Already defined in App.scss
const ThumbGrid = ({ cards }) => (<div className="ThumbGrid">
    {[...Object.keys(cards).map((item, i) => <ThumbCard key={i} {...cards[item]} i={item} />)]}
</div>)

const greetings = [
    "Bal'a dash, malanore ",
    "Doral ana'diel?",
    "Sinu a'manore."
]

const cards = [
    {
        "link": "http://blog.argcv.com/",
        "title": "The Blog",
        "content": "Something Interested by Yu",
        "thumb": "https://cdn.worldvectorlogo.com/logos/wordpress-icon.svg"
    },
    {
        "link": "http://github.com/yuikns",
        "title": "The Github Page",
        "content": "Yu's Public Repositories",
        "thumb": "https://cdn.worldvectorlogo.com/logos/github-icon.svg"
    },
    {
        "link": "https://gitter.im/argcv/argcv",
        "title": "The Gitter Room",
        "content": "Gitter is an open source instant messaging and chat room system for developers and users of GitHub repositories.",
        "thumb": "https://cdn.worldvectorlogo.com/logos/gitter.svg"
    },
    {
        "link": "https://blog.argcv.com/guestbook",
        "title": "The Guest Book",
        "content": "Anything wish to talk with Me? Please Click here!"
    }
]

const blogBaseUrl = "https://blog.argcv.com/wp-json"
const blogV2BaseUrl = blogBaseUrl + "/wp/v2"
const blogURL = blogV2BaseUrl + "/posts"
const mediaUrl = blogV2BaseUrl + "/media/"

class BlogPostList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
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
                    title: htmlDecode(item.title.rendered),
                    content: htmlDecode(item.excerpt.rendered),
                    thumb: item.media_source_url,
                    stamp: item.date
                }))]} />
            </div>
        )
    }
}


const Home = ({ match }) => (
    <div>
        <h4><span style={{ color: 'Red' }} className="TextShadow">{greetings[Math.floor(Math.random() * greetings.length)]}</span> welcome to my homepage~</h4>
        <hr />
        <BlogPostList />
        <hr />
        <h1>Teleport Portals</h1>
        <ThumbGrid cards={[...cards]} />
    </div >
)

export default Home