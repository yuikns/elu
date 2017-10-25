import { dependencies, devDependencies } from '../../package.json'

import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import FontAwesome from 'react-fontawesome'
import 'react-tabs/style/react-tabs.less'

const Deps = ({ type }) => {
    const func = function (deps) {
        return Object.keys(deps).
            map((dep, i) =>
                <li key={i}>
                    <a href={`https://www.npmjs.com/package/${dep}`} > {dep}</a>
                </li>)
    }

    var myDeps = []
    if (type == "dev-deps") {
        // const devDeps = Object.keys()
        //     .map((dep, i) => <li key={i}>{dep}</li>)
        myDeps = func(devDependencies)
    } else {
        // const deps = Object.keys(dependencies)
        //     .map((dep, i) => <li key={i}>{dep}</li>)
        // myDeps = deps
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
        console.log("current index:", tabIndex)
        this.setState({ tabIndex })
    }

    render() {
        let { match } = this.props
        return (<div>
            <h2>Powered by</h2>
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.onSelect(tabIndex)}>
                <TabList>
                    <Tab>Dependencies</Tab>
                    <Tab>Dev-Dependencies</Tab>
                </TabList>
                <TabPanel>
                    <Deps type="deps" />
                </TabPanel>
                <TabPanel>
                    <Deps type="dev-deps" />
                </TabPanel>
            </Tabs>
        </div>)
    }
}