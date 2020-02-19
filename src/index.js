import React from 'react'
import ReactDOM from 'react-dom'

import './reset.css'
import './index.css'

import LiveSearch from 'components/LiveSearch'

function App () {
  return <LiveSearch />
}

ReactDOM.render(<App />, document.getElementById('app'))
