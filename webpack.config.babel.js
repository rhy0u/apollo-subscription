import path from 'path'
import AssetsPlugin from 'assets-webpack-plugin'
import webpack from 'webpack'

const DIST_PATH = path.resolve(__dirname, 'public/dist')
const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export default {
  mode: development ? 'development' : 'production',
  entry: './src/client/index.js',
  output: {
    path: DIST_PATH,
    filename: development ? '[name].js' : '[name]-bundle-[hash].js',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    publicPath: '/dist/',
  },
  devtool: development ? 'cheap-module-source-map' : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', 'src'],
    alias: {
      '@material-ui/styles': path.resolve(
        __dirname,
        'node_modules',
        '@material-ui/styles',
      ),
    },
  },
  plugins: [
    ...(development
      ? [new webpack.HotModuleReplacementPlugin()]
      : [new AssetsPlugin({ path: DIST_PATH })]),
  ],
  ...(development
    ? {
        devServer: {
          host: '0.0.0.0',
          hot: true,
          contentBase: DIST_PATH,
          publicPath: '/dist/',
          proxy: { '*': { target: 'http://localhost:8000' } },
        },
      }
    : {}),
}
