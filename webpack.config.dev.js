import path from 'path';
import webpack from 'webpack';
import postCSSConfig from './server/config/postcss.config'

export default {
  devtools: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '/client/index.js')
  ],
  output: {
    path: '/',
    publicPath: '/'
  },
    postcss: function() {
    return postCSSConfig;
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module:{
    loaders: [
      {
         test: /\.js$/,
         include:path.join(__dirname, '/client'),
         loaders: ['react-hot-loader/webpack', 'babel']
      },
      {
          test: /\.css$/,
          include: path.join(__dirname, '/client'),
          loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&camelCase!postcss'
        },
    ]
  },
  resolve:{
    extensions: ['','.js']
  }
}
