require('babel-polyfill');

var chai = require('chai');
var chaiEnzyme = require('chai-enzyme');

chai.use(chaiEnzyme())

var context = require.context('./client', true, /\.spec\.js$/);
context.keys().forEach(context);
