
import React from 'react';
import { Link } from 'react-router-dom';

const greetings = [
    "Bal'a dash, malanore ",
    "Doral ana'diel?",
    "Sinu a'manore."
]

const Home = ({ match }) => (
    <div>
        <h2 ><span style={{ color: 'Gold' }} className="TextShadow">{greetings[Math.floor(Math.random() * greetings.length)]}</span></h2>
        <hr />
        <p>This site is still working in progress.</p>
        <h3>You can: </h3>
        <ul>
            <li>Visit my blog <a href="http://blog.argcv.com/">here</a>,</li>
            <li>Find my codes <a href="http://github.com/yuikns">here</a>,</li>
            <li>Chat <a href="https://gitter.im/argcv/argcv">here</a>,</li>
            <li>Leave me a note <a href="https://blog.argcv.com/guestbook">here</a>,</li>
            <li>OR do anything you wish..</li>
        </ul>
        <p>Have a good day!</p>
    </div >
)

export default Home