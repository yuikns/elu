import React from 'react'
import { Switch, BrowserRouter as Router, Route, NavLink, Link, ActivePara } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import logo from './images/logo.svg'
import Home from './views/Home'
import News from './views/News'
import About from './views/About'
import PoweredBy from './views/PoweredBy'
import NoMatch from './views/NotMatched'
import Articles from './views/Articles'
import SiteSignatureText from './components/SiteSignatureText'

import './styles/App.scss'

const SubMenu = Menu.SubMenu

class MobileFriendlyNavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    
    componentWillReceiveProps(props) {
    }
    
    render() {
        let { location } = this.props
        let cKey = "/"
        if (location && location.pathname) {
            cKey = location.pathname
        }
        if (cKey.length < 2) {
            cKey = "nav-"
        } else {
            let paths = cKey.split("/")
            if (paths.length > 1) {
                cKey = "nav-" + paths[1]
            }
        }
        return (
            <div>
                <Menu
                    selectedKeys={[cKey]}
                    theme="light"
                    mode="inline"
                >
                    <SubMenu key="#" title={<h1 className="HandscriptFont"><SiteSignatureText /></h1>}>
                        <Menu.Item key="nav-"><Link to="/">Home</Link></Menu.Item>
                        <Menu.Item key="nav-news"><Link to="/news">News</Link></Menu.Item>
                        <Menu.Item key="nav-about"><Link to="/about">About</Link></Menu.Item>
                        <Menu.Item key="nav-powered-by"><Link to="/powered-by">PoweredBy</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

const App = () => (
    <Router>
        <div className="App">
            <div className="App-DesktopOnly">
                <div className="Header BoxShadow">
                    <a href="/"><h1 className="App-title HandscriptFont"><SiteSignatureText /></h1></a>
                    <div className="Nav">
                        <div className="Nav-Content">
                            <NavLink exact className="Link" to="/">Home</NavLink>
                            <NavLink className="Link" to="/news">News</NavLink>
                            <NavLink className="Link" to="/about">About</NavLink>
                            <NavLink className="Link" to="/powered-by">PoweredBy</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="App-MobileOnly">
                <MobileFriendlyNavBar location={location} />
            </div>
            <div className="clearfix" />
            <div className="Content BoxShadow">
                <div className="App-content">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/news" component={News} />
                        <Route path="/about" component={About} />
                        <Route path="/powered-by" component={PoweredBy} />
                        <Route path="/articles/:id.c" component={Articles} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </div>
            <div className="clearfix" />
            <div className="Footer" />
        </div>
    </Router>
)

export default App
