/* eslint-disable react/no-danger, jsx-a11y/html-has-lang */
import React from 'react'

const Html = ({ assets, polyfill = true }) => (
  <html lang="fr">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <div id="root" />
      {polyfill && (
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.fr" />
      )}
      <script src={assets.main.js} />
    </body>
  </html>
)

export default Html
