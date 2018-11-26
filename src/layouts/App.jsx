import React from 'react'

import PropTypes from 'prop-types'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'

import { MdMenu, MdChevronLeft } from 'react-icons/md'

import { Switch, BrowserRouter as Router, Route, NavLink, Link, ActivePara } from 'react-router-dom'
// import Button from '@material-ui/core/Button'
import logo from 'assets/img/logo.svg'
import SiteSignatureText from 'components/SiteSignatureText'
import RouteSpec from 'routes/index'

import styles from 'assets/jss/layouts/App'

import 'assets/scss/App.scss'

// const SubMenu = Menu.SubMenu

const path = require('path')

class App extends React.Component {
  state = {
    mobileOpen: false,
    open: false,
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes, theme, match, location, ...rest } = this.props
    const { open } = this.state

    let baseUrl = ""

    if (match && match.url) {
      baseUrl = match.url
    }


    return (
      <Router>
        <div className={classes.root}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-left`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <Hidden mdUp>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, open && classes.hide)}
                >
                  <MdMenu />
                </IconButton>
              </Hidden>
              <Button component={Link} to={baseUrl} >
                <Typography variant="title" color="inherit" noWrap className={classes.textInPrimary} >
                  <SiteSignatureText />
                </Typography>
              </Button>
              <Hidden smDown>
                <Route>
                  {({ location }) => {
                    const { pathname } = location
                    let dirname = ''
                    if (pathname.length < 2) {
                      dirname = '/'
                    } else {
                      const paths = pathname.split('/')
                      if (paths.length > 1) {
                        dirname = '/' + paths[1].toLowerCase()
                      }
                    }
                    return (<div>
                      {RouteSpec.map((prop, key) => {
                        if (prop.header) {
                          return <Button
                            component={Link} to={path.join(baseUrl, prop.path)}
                            className={dirname === prop.path ? classes.textInSecondary : classes.textInPrimary}
                            key={key}> {prop.name}
                          </Button>
                        } else {
                          return null
                        }
                      })}
                    </div>)
                  }}
                </Route>
              </Hidden>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <MdChevronLeft />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <Route>
                {({ location }) => {
                  const { pathname } = location
                  let dirname = ''
                  if (pathname.length < 2) {
                    dirname = '/'
                  } else {
                    const paths = pathname.split('/')
                    if (paths.length > 1) {
                      dirname = '/' + paths[1].toLowerCase()
                    }
                  }
                  return (<div>
                    {RouteSpec.map((prop, key) => {
                      if (prop.sidebar) {
                        return <ListItem
                          button
                          component={props => <Link to={path.join(baseUrl, prop.path)} {...props} />}
                          className={dirname === prop.path ? classes.labelInSecondary : classes.labelInPrimary}
                          key={key}>
                          <ListItemText primary={prop.name} />
                        </ListItem>
                      } else {
                        return null
                      }
                    })}
                  </div>)
                }}
              </Route>
            </List>
          </Drawer>

          <main className={classNames(classes.content, classes[`content-left`], {
            [classes.contentShift]: open,
            [classes[`contentShift-left`]]: open,
          })}>
            {/*  <div className={classes.toolbar} /> */}
            <div className={classes.drawerHeader} />
            <Switch>
              {RouteSpec.map((prop, key) => {
                if (prop.redirect) {
                  return <Redirect from={path.join(baseUrl, prop.path)} to={path.join(baseUrl, prop.to)} key={key} />
                } else if (prop.fallback) {
                  return <Route component={prop.component} key={key} />
                } else {
                  return <Route exact={prop.exact} path={path.join(baseUrl, prop.path)} component={prop.component} key={key} />
                }
              })}
            </Switch>
            <div className="clearfix" />
            <div className="Footer" />
          </main>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(App)

