import React from 'react'
import ReactGA from 'react-ga'

import ThumbGrid from 'components/ThumbGrid'
import { HostTitle } from 'components/SiteSignatureText'

const greetings = [
    "Bal'a dash, malanore ",
    "Doral ana'diel?",
    "Sinu a'manore.",
]

const cards = [
    {
        "link": "http://blog.argcv.com/",
        "title": "The Blog",
        "content": "Something Interested by Yu",
        "thumb": "https://cdn.worldvectorlogo.com/logos/wordpress-icon.svg",
    },
    {
        "link": "http://dev.argcv.com/",
        "title": "The Repository",
        "content": "The Repository Hosted by ArgCV",
        "thumb": "https://cdn.worldvectorlogo.com/logos/gitlab.svg",
    },
    {
        "link": "http://github.com/yuikns",
        "title": "The Github Page",
        "content": "Yu's Public Repositories",
        "thumb": "https://cdn.worldvectorlogo.com/logos/github-icon.svg",
    },
    {
        "link": "http://gitter.im/argcv/argcv",
        "title": "The Gitter Room",
        "content": "Gitter is an open source instant messaging and chat room system for developers and users of GitHub repositories",
        "thumb": "https://cdn.worldvectorlogo.com/logos/gitter.svg",
    },
    {
        "link": "http://blog.argcv.com/gallery",
        "title": "The Gallery",
        "content": "A Few Valuable Links Listed by Yu",
    },
    {
        "link": "http://blog.argcv.com/guestbook",
        "title": "The Guest Book",
        "content": "Anything wish to talk with Me? Please Click here!",
    },
]

export default ({ match }) => {
    ReactGA.pageview(window.location.pathname + window.location.search)
    return (
        <div>
            <HostTitle suffix="enjoy coding, enjoy life." />
            <h2 className="ComicFont">{greetings[Math.floor(Math.random() * greetings.length)]}</h2>
            <hr />
            <ThumbGrid cards={[...cards]} />
        </div >
    )
}
