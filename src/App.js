import React from 'react'

import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar'
import List from 'material-ui/List'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import MenuIcon from 'material-ui-icons/Menu'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';


import { Switch, BrowserRouter as Router, Route, NavLink, Link, ActivePara } from 'react-router-dom'
// import { Menu } from 'antd'
// import Button from 'material-ui/Button'


import logo from './images/logo.svg'
import Home from './views/Home'
import News from './views/News'
import About from './views/About'
import PoweredBy from './views/PoweredBy'
import NoMatch from './views/NotMatched'
import Articles from './views/Articles'
import SiteSignatureText from './components/SiteSignatureText'

import './styles/App.scss'

// const SubMenu = Menu.SubMenu

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
        
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  menuButtons: {
    flexDirection: 'row-reverse',
    marginLeft: -12,
    marginRight: 20,
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
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

class MenuBar extends React.Component {
  state = {
    mobileOpen: false,
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  render() {
    const { classes, theme } = this.props

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>{MenuData}</List>
      </div>
    )

    return (
      <Router>
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
             
            <Button component={Link} to="/" >
              <Typography variant="title" color="inherit" noWrap className={classes.textInPrimary} >
                <SiteSignatureText />
              </Typography>
            </Button>
            <Hidden smDown>
                <Button component={Link} to="/news" className={classes.textInPrimary} > News </Button>
                <Button component={Link} to="/about" className={classes.textInPrimary} > About </Button>
                <Button component={Link} to="/powered-by" className={classes.textInPrimary} > PoweredBy </Button>
              
            </Hidden>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
        </Hidden>

        <Hidden smDown implementation="css">
          {/* this part will always display in left*/}
          { /*
          <Drawer
            variant="permanent"
          open={false}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
              */}
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/news" component={News} />
                <Route path="/about" component={About} />
                <Route path="/powered-by" component={PoweredBy} />
                <Route path="/articles/:id.c" component={Articles} />
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

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(MenuBar)

