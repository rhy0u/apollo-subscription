import convict from 'convict'
import path from 'path'
import { getAssets } from 'server/utils/webpack'

const DEFAULT_PUBLIC_PATH = path.join(__dirname, '../../public')

const config = convict({
  env: {
    env: 'NODE_ENV',
    default: 'development',
  },
  server: {
    secure: {
      doc: 'Specify if the server is using https or not.',
      format: Boolean,
      default: false,
    },
    port: {
      env: 'PORT',
      default: 8000,
    },
    assets: {
      webpackAssets: {
        doc: 'Use webpack-assets.json file',
        format: Boolean,
        default: false,
        env: 'WEBPACK_ASSETS',
      },
      main: {
        js: {
          doc: 'Main JS file',
          format: String,
          default: '/dist/main.js',
        },
      },
    },
    publicPath: {
      doc: 'The public path',
      format: String,
      default: DEFAULT_PUBLIC_PATH,
    },
    externalUrl: {
      default: 'http://localhost',
    },
    graphql: {
      playground: {
        default: true,
      },
    },
  },
})

const env = config.get('env')
config.loadFile(path.join(__dirname, `../../config/${env}.json`))

config.validate()

if (config.get('server.assets.webpackAssets')) {
  config.set(
    'server.assets',
    getAssets({ publicPath: config.get('server.publicPath') }),
  )
}

export default config
