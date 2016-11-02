import path from 'path';
import webpack from 'webpack';
import postCSSConfig from './server/config/postcss.config';
import dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV;

const dotEnvVars = dotenv.config();
const environmentEnv = dotenv.config({
  path: path.join(__dirname, '/client', `${NODE_ENV}.config.js`),
  silent: true,
});
const envVariables =
    Object.assign({}, dotEnvVars, environmentEnv);

const defines =
  Object.keys(envVariables)
  .reduce((memo, key) => {
    const val = JSON.stringify(envVariables[key]);
    memo[`__${key.toUpperCase()}__`] = val;
    return memo;
  }, {
    __NODE_ENV__: JSON.stringify(NODE_ENV)
  });

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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(defines)
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
