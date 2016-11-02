var path = require('path');
var webpack = require('webpack');
var postCSSConfig = require('./server/config/postcss.config');
var dotenv = require('dotenv');

const NODE_ENV = process.env.NODE_ENV;
const isDev  = NODE_ENV === 'development';
const isTest = NODE_ENV === 'test';

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



var webpack = {
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
         exclude: path.join(__dirname, '/node_modules'),
         loaders: ['react-hot-loader/webpack', 'babel']
      },
      {
          test: /\.css$/,
          include: path.join(__dirname, '/client'),
          loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
        },
        {
            test: /\.css$/,
            include: path.join(__dirname, '/node_modules'),
            loader: 'style!css'
          },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
        { test: /\.json$/, loader: "json-loader" }
    ]
  },
  resolve:{
    extensions: ['','.js']
  }
}

if (isTest) {
  webpack.externals = {
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true
  }

  webpack.plugins = webpack.plugins.filter(p => {
    const name = p.constructor.toString();
    const fnName = name.match(/^function (.*)\((.*\))/)

    const idx = [
      'DedupePlugin',
      'UglifyJsPlugin'
    ].indexOf(fnName[1]);
    return idx < 0;
  })
}

module.exports = webpack;
