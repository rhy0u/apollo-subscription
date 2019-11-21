import React from 'react'
import { renderToString } from 'react-dom/server'
import config from 'server/config'
import Html from 'server/components/Html'

const reactMiddleware = (req, res) => {
  const body = `<!DOCTYPE html>${renderToString(
    <Html assets={config.get('server.assets')} />,
  )}`
  res.set('Content-Type', 'text/html')
  res.send(body)
}

export default reactMiddleware
