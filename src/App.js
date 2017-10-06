import './styles/index.scss'
import './styles/App.css'
import logo from './images/logo.svg'
import Home from './views/Home'
import PoweredBy from './views/PoweredBy'
import About from './views/About'
import NoMatch from './views/NotMatched'
import ArgcvText from './components/ArgcvText'

import React from 'react'
import { Switch, BrowserRouter as Router, Route, NavLink, ActivePara } from 'react-router-dom'

const App = () => (
    <Router>
        <div className="App">
            <div className="Header BoxShadow">
                <a href="/"><h1 className="App-title"><ArgcvText /></h1></a>
                <div className="Nav">
                    <div className="Nav-Content">
                        <NavLink exact className="Link" to="/">Home</NavLink>
                        <NavLink className="Link" to="/about">About</NavLink>
                        <NavLink className="Link" to="/powered-by">PoweredBy</NavLink>
                    </div>
                </div>
            </div>
            <div className="ClearFix BoxShadow" />
            <div className="Content">
                <div className="App-content">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/powered-by" component={PoweredBy} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </div>
        </div>
    </Router>
)

export default App
