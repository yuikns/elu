import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

import 'font-awesome/css/font-awesome.min.css'
import './styles/index.scss'

ReactDOM.render(<LocaleProvider locale={enUS}>
    <App />
</LocaleProvider>, document.getElementById('root'))
