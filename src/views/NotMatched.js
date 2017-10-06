
import React from 'react'
import Img404 from '../images/404.jpg'

const NoMatch = ({ location }) => (
  <div>
    <h2>404 Not Found</h2>
    <hr />
    <h3>This is a lost area.</h3>
    <img src={Img404} />
  </div>
)

export default NoMatch

