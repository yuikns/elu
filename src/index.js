import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import Loadable from 'react-loadable'

// import App from './App'
import './styles/index.scss'


import { google_analytics } from '../package.json'

import CssBaseline from 'material-ui/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import purple from 'material-ui/colors/purple'
import grey from 'material-ui/colors/grey'
import orange from 'material-ui/colors/orange'

const theme = createMuiTheme({
  palette: {
    secondary: orange,
  },
  status: {
    danger: 'orange',
  },
})

const LoadableApp = Loadable({
  loader: () => import('./App'),
  loading() {
    return <div></div>
  }
})

class Root extends React.Component {
    constructor(props) {
        super(props)
        console.log("[GA] initialize")
        ReactGA.initialize(google_analytics, {
            debug: true,
            titleCase: false,
        })
        this.state = {}
    }

    componentWillReceiveProps(props) {
        console.log("google_analytics : ", google_analytics)
    }

    async componentDidMount() {
        // import('font-awesome/css/font-awesome.min.css').then(_ => {
        //     console.log("font-awesome is loaded..")
        // })
    }

    render() {
        return (<MuiThemeProvider theme={theme}>
                <CssBaseline />
                <LoadableApp />
            </MuiThemeProvider>)
    }

}

ReactDOM.render(<Root />, document.getElementById('root'))

