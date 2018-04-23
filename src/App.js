import React from 'react'
import Loadable from 'react-loadable'

import PropTypes from 'prop-types'
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import Toolbar from 'material-ui/Toolbar'
import List from 'material-ui/List'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'

import { MdMenu, MdChevronLeft } from 'react-icons/lib/md'


import { Switch, BrowserRouter as Router, Route, NavLink, Link, ActivePara } from 'react-router-dom'
// import { Menu } from 'antd'
// import Button from 'material-ui/Button'


import logo from './images/logo.svg'
// import Home from './views/Home'
// import News from './views/News'
// import About from './views/About'
// import Articles from './views/Articles'
// import PoweredBy from './views/PoweredBy'
import NoMatch from './views/NotMatched'
import SiteSignatureText from './components/SiteSignatureText'

import './styles/App.scss'

// const SubMenu = Menu.SubMenu

const LoadableHome = Loadable({
  loader: () => import('./views/Home'),
  loading() {
    return <div></div>
  }
})

const LoadableNews = Loadable({
  loader: () => import('./views/News'),
  loading() {
    return <div></div>
  }
})

const LoadableAbout = Loadable({
  loader: () => import('./views/About'),
  loading() {
    return <div></div>
  }
})

const LoadableArticles = Loadable({
  loader: () => import('./views/Articles'),
  loading() {
    return <div></div>
  }
})

const LoadablePoweredBy = Loadable({
  loader: () => import('./views/PoweredBy'),
  loading() {
    return <div></div>
  }
})

const LoadableHelloSlate = Loadable({
  loader: () => import('./views/HelloSlate'),
  loading() {
    return <div></div>
  }
})



const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    // padding: theme.spacing.unit,
    // backgroundColor: theme.palette.background,
    // color: theme.palette.primary,
  },
  appBar: {
    // position: 'absolute',
    // marginLeft: drawerWidth, //
    // [theme.breakpoints.up('md')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    // },
    // marginLeft: 0, //
    // [theme.breakpoints.up('md')]: {
    //   width: `calc(100%)`,
    // },
    // for shifting
    // position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
  },
  // for shifting
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  menuButtons: {
    flexDirection: 'row-reverse',
    marginLeft: 12,
    marginRight: 20,
  },
  // for shifting
  hide: {
    display: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    // for shifting
    position: 'relative',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
      // for shifting
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  textInPrimary: {
    backgroundColor: theme.palette.primary.main,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.common.white,
  },
})

const MenuData = <div>
    <ListItem button component={props => <Link to="/" {...props} />}>
        <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={props => <Link to="/news" {...props} />}>
        <ListItemText primary="News" />
    </ListItem>
    <ListItem button component={props => <Link to="/about" {...props} />}>
        <ListItemText primary="About" />
    </ListItem>
    <ListItem button component={props => <Link to="/powered-by" {...props} />}>
        <ListItemText primary="PoweredBy" />
    </ListItem>
</div>

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
    const { classes, theme } = this.props
    const { open } = this.state
    
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
            <Button component={Link} to="/" >
              <Typography variant="title" color="inherit" noWrap className={classes.textInPrimary} >
                <SiteSignatureText />
              </Typography>
            </Button>
            <Hidden smDown>
                <Button component={Link} to="/news" className={classes.textInPrimary} > News </Button>
                <Button component={Link} to="/about" className={classes.textInPrimary} > About </Button>
                <Button component={Link} to="/powered-by" className={classes.textInPrimary} > PoweredBy </Button>
                <Button component={Link} to="/slate" className={classes.textInPrimary} > Slate </Button>
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
              <List>{MenuData}</List>
            </Drawer>
            
        <main className={classNames(classes.content, classes[`content-left`], {
              [classes.contentShift]: open,
              [classes[`contentShift-left`]]: open,
            })}>
            {/*  <div className={classes.toolbar} /> */}
            <div className={classes.drawerHeader} />
          <Switch>
                <Route exact path="/" component={LoadableHome} />
                <Route path="/news" component={LoadableNews} />
                <Route path="/about" component={LoadableAbout} />
                <Route path="/slate" component={LoadableHelloSlate} />
                <Route path="/powered-by" component={LoadablePoweredBy} />
                <Route path="/articles/:id.c" component={LoadableArticles} />
                <Route component={NoMatch} />
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

