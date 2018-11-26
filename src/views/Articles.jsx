import React from 'react'
import ReactGA from 'react-ga'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { GetBlogPost } from 'components/BlogPostList'

import styles from 'assets/jss/views/Articles'

class Articles extends React.Component {
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
                let { title, link, content } = data
                console.log("Got: %o %o %o", title, link, content)
                this.setState({
                    title: title.rendered,
                    link: link,
                    content: content.rendered,
                })
                // setTimeout(() => {
                //     window.location = link
                // }, 5000)
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
        const { classes } = this.props
        ReactGA.pageview(window.location.pathname + window.location.search)
        // let pathStr = this.props.location.pathname.substring(globalConfig.baseURI.length)
        // let path = pathStr.split("/").filter(function (n) { return n })
        // window.location = 'http://blog.argcv.com/articles/' + this.props.match.params.id + '.c'
        if (this.state.failed) {
            return (
                <div className="">
                    <h1>Error! I Can Not Process Your Request...</h1>
                    <hr />
                    <p>{this.state.failure_message}</p>
                </div>
            )
        } else {
            return (
                <div className="">
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.pos}>
                                Thank you for visiting my blog. <br/>
                                Currently, this post was moved to <a href={this.state.link}>{this.state.link}</a>
                            </Typography>
                            <Typography variant="headline" component="h2">
                                {this.state.title}
                            </Typography>
                            <Typography component="p">
                                <span dangerouslySetInnerHTML={{ __html: this.state.content }} style={{ 'display': 'inline' }} />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" href={this.state.link}>Read More</Button>
                        </CardActions>
                    </Card>
                </div>
            )
        }
    }
}

Articles.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Articles);
