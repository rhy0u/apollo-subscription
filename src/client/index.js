import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import apolloClient from 'client/utils/apolloClient'
import { ApolloProvider } from '@apollo/react-hooks'
import App from 'client/App'
import GlobalStyle from 'client/components/GlobalStyle'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)
