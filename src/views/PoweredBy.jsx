import React from 'react'
import ReactGA from 'react-ga'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


// ref: https://github.com/gorangajic/react-icons
// ref: https://octicons.github.com/
import { GoMarkGithub, GoRepoClone } from 'react-icons/go'

import GithubChangeLog from 'components/GithubChangeLog'
import { Host, HostTitle } from 'components/SiteSignatureText'
import { dependencies, devDependencies } from '../../package.json'

import styles from 'assets/jss/views/PoweredBy'

const Deps = ({ type, classes }) => {
  const func = function (deps) {
    return Object.keys(deps).
      map((dep, i) =>
        <li key={i}>
          <a href={`https://www.npmjs.com/package/${dep}`} >{dep} - {deps[dep]}</a>
        </li>)
  }
  var myDeps = []
  if (type == "dev-deps") {
    myDeps = func(devDependencies)
  } else {
    myDeps = func(dependencies)
  }
  // return (<div className={classes.typography}>
  //   <ul>{[...myDeps]}</ul>
  // </div>)
  return <React.Fragment>
    <Card>
      <CardContent>
        <Typography component="div">
          <ul>{[...myDeps]}</ul>
        </Typography>
      </CardContent>
    </Card>
  </React.Fragment>
}

class PoweredBy extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      tabIndex: 0,
    }
  }

  handleChange = (event, tabIndex) => {
    this.setState({ tabIndex })
  }

  render() {
    const { classes } = this.props
    const { tabIndex } = this.state

    return (
      <div className={classes.root}>
        <Tabs
          value={tabIndex}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            icon={<GoMarkGithub />}
            label="Project Elu"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            icon={<GoMarkGithub />}
            label="Project ArgCV"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            icon={<GoRepoClone />}
            label="Dev-Dependencies"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            icon={<GoRepoClone />}
            label="Dependencies"
          />
        </Tabs>
        {tabIndex == 0 && <GithubChangeLog vendorName="yuikns" repoName="elu" />}
        {tabIndex == 1 && <GithubChangeLog vendorName="yuikns" repoName="argcv" />}
        {tabIndex == 2 && <Deps type="dev-deps" classes={classes} />}
        {tabIndex == 3 && <Deps type="deps" classes={classes} />}
      </div>
    )
  }
}

PoweredBy.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PoweredBy)
