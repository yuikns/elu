import './styles/index.scss';
import './styles/App.css';
import { dependencies, devDependencies } from '../package.json';
import logo from './images/logo.svg';

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

const BasicExample = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <a href="/"><h1 className="App-title">Elu</h1></a>
        <div className="App-menues">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/topics">Topics</Link>
          <Link to="/powered-by">PoweredBy</Link>
        </div>
      </header>
      <div className="App-intro">
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>
        <Route path="/powered-by" component={PoweredBy}/>
      </div>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <ol>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
    </ol>
  </div>
)

const About = ({match}) => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const PoweredBy = () => {
  const deps = Object.keys(dependencies)
    .map((dep, i) => <li key={i}>{dep}</li>);
  const devDeps = Object.keys(devDependencies)
    .map((dep, i) => <li key={i + 10}>{dep}</li>);

  return (
    <div>
      <h2>Powered by</h2>
      <strong> Using Dependencies: </strong>
      &nbsp;
      <ul>
        {[...deps]}
      </ul>
      <strong> Using Dev-Dependencies: </strong>
      &nbsp;
      <ul>
        {[...devDeps]}
      </ul>
    </div>
  )
}

export default BasicExample

ReactDOM.render(<BasicExample />, document.getElementById('root'))

