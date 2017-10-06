import { dependencies, devDependencies } from '../../package.json'

import React from 'react'
import { Switch, BrowserRouter as Router, Route, NavLink, ActivePara } from 'react-router-dom'

const Deps = ({ match }) => {
    var myDeps = []
    if (match.params.typeName == "dev-deps") {
        const devDeps = Object.keys(devDependencies)
            .map((dep, i) => <li key={i + 10}>{dep}</li>)
        myDeps = devDeps
    } else {
        const deps = Object.keys(dependencies)
            .map((dep, i) => <li key={i}>{dep}</li>)
        myDeps = deps
    }
    return (<ul>{[...myDeps]}</ul>)
}

const PoweredBy = ({ match }) => {


    return (
        <div>
            <h2>Powered by</h2>
            <ul>
                <li><NavLink to={`${match.url}/deps`}> Using Dependencies: </NavLink></li>
                <li>
                    <NavLink to={`${match.url}/dev-deps`}> Using Dev-Dependencies:         </NavLink>
                </li>
            </ul>
            <hr />
            <div>
                <Route path={`${match.url}/:typeName`} component={Deps} />
                <Route exact path={match.url} render={() => (
                    <h3>Please select a type.</h3>
                )} />
            </div>
        </div>
    )
}

export default PoweredBy