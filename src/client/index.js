import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import apolloClient from 'client/utils/apolloClient'
import { ApolloProvider } from '@apollo/react-hooks'
import App from 'client/App'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)
