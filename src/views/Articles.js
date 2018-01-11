import React from 'react'

import { Route } from 'react-router'
import { Alert } from 'antd'


import { GetBlogPost } from '../components/BlogPostList'

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            title: '',
            content: '',
            link: '',
            failed: false,
            failure_message: '',
        }
    }

    componentDidMount() {
        GetBlogPost(
            this.state.id,
            (data) => {
                console.log("Got: %o", data)
                let {title, link, content} = data
                console.log("Got: %o %o %o", title, link, content)
                this.setState({
                    title: title.rendered,
                    link: link,
                    content: content.rendered,
                })
                setTimeout(() => {
                    window.location = link
                }, 5000)
            },
            (err) => {
                this.setState({
                    failed: true,
                    failure_message: err.message,
                })
            }
        )

    }

    render() {
        // let pathStr = this.props.location.pathname.substring(globalConfig.baseURI.length)
        // let path = pathStr.split("/").filter(function (n) { return n })
        // window.location = 'http://blog.argcv.com/articles/' + this.props.match.params.id + '.c'
        if(this.state.failed) {
            return (
                <div className="">
                    <h1>Error! I Can Not Process Your Request...</h1>
                    <hr/>
                    <p>{this.state.failure_message}</p>
                </div>
            )
        } else {
            return (
                <div className="">
                    <Alert message={<span>Thank you for visiting my blog, however, this post is moved to <a href={this.state.link}>{this.state.link}</a> and you will be redirected the new location in 5 seconds...</span>} type="info" />
                    <br/>
                    <br/>
                    <h1>{this.state.title}</h1>
                    <hr/>
                    <div dangerouslySetInnerHTML={{ __html: this.state.content }} style={{ 'display': 'inline' }} />
                </div>
            )
        }
    }
}