
import React from 'react'
import ReactGA from 'react-ga'

import { Host, HostTitle } from '../components/SiteSignatureText'
import Img404 from '../images/404.jpg'

const NoMatch = ({ location }) => {
  ReactGA.pageview(window.location.pathname + window.location.search)
  return (
    <div>
      <HostTitle suffix="Page Not Found" />
      <h2>404 Not Found</h2>
      <hr />
      <h3>This is a lost area.</h3>
      <img src={Img404} />
    </div>
  )
}

export default NoMatch

