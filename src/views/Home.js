
import React from 'react'

import { Link } from 'react-router-dom'
import ThumbGrid from '../components/ThumbGrid'
import BlogPostList from '../components/BlogPostList'
import { Host, HostTitle } from '../components/SiteSignatureText'

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




const Home = ({ match }) => (
    <div>
        <HostTitle  suffix="enjoy coding, enjoy life." />
        <h4><span style={{ color: 'Red' }} className="TextShadow">{greetings[Math.floor(Math.random() * greetings.length)]}</span> welcome to my homepage~</h4>
        <hr />
        <BlogPostList />
        <hr />
        <h1>Teleport Portals</h1>
        <ThumbGrid cards={[...cards]} />
    </div >
)

export default Home