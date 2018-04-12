import React from 'react'
import ReactGA from 'react-ga'

import { Route } from 'react-router'

import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import { GetBlogPost } from '../components/BlogPostList'

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
})

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
                        Thank you for visiting my blog, however, this post is moved to <a href={this.state.link}>{this.state.link}</a> and you will be redirected the new location in 5 seconds...
                      </Typography>
                      <Typography variant="headline" component="h2">
                        {this.state.title}
                      </Typography>
                      <Typography component="p">
                        <span dangerouslySetInnerHTML={{ __html: this.state.content }} style={{ 'display': 'inline' }} />
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" href={this.state.link}>Learn More</Button>
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