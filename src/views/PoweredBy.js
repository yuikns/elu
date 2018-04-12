import React from 'react'
import ReactGA from 'react-ga'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
// import FontAwesome from 'react-fontawesome'

// ref: https://github.com/gorangajic/react-icons
// ref: https://octicons.github.com/
import {GoMarkGithub, GoRepoClone } from 'react-icons/lib/go'



import GithubChangeLog from '../components/GithubChangeLog'
import { Host, HostTitle } from '../components/SiteSignatureText'
import { dependencies, devDependencies } from '../../package.json'

import 'react-tabs/style/react-tabs.less'

const Deps = ({ type }) => {
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
    return (<ul>{[...myDeps]}</ul>)
}

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = { tabIndex: 0 }
    }

    onSelect(tabIndex) {
        // console.log("current index:", tabIndex)
        this.setState({ tabIndex })
    }

    render() {
        let { match } = this.props
        ReactGA.pageview(window.location.pathname + window.location.search)
        return (<div>
            <HostTitle suffix="Powered by" />
            <h2>Powered by</h2>
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.onSelect(tabIndex)}>
                <TabList>
                    <Tab><GoMarkGithub /> Project Elu</Tab>
                    <Tab><GoMarkGithub /> Project ArgCV</Tab>
                    <Tab><GoRepoClone /> Dev-Dependencies</Tab>
                    <Tab><GoRepoClone /> Dependencies</Tab>
                </TabList>
                <TabPanel>
                    <GithubChangeLog vendorName="yuikns" repoName="elu" />
                </TabPanel>
                <TabPanel>
                    <GithubChangeLog vendorName="yuikns" repoName="argcv" />
                </TabPanel>
                <TabPanel>
                    <Deps type="dev-deps" />
                </TabPanel>
                <TabPanel>
                    <Deps type="deps" />
                </TabPanel>
            </Tabs>
        </div>)
    }
}