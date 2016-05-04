var webpack = require('webpack');
var path = require('path');
var fs = require('fs');


function mapExternals(paths,externalsArray){
  paths.forEach(function(path){
    fs.readdirSync(path)
      .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
      })
      .forEach(function(mod) {
        externals[mod] = 'commonjs ' + mod;
      });
  });
}

var args = process.argv.slice(2);
var externals = null;
var target;
var libraryTarget;
var outputFilename;
var plugins = [];
if(args.indexOf('--target-browser') != -1){
  console.log('Targeting browser');
  outputFilename = 'tests.sfx.js';
  target = 'web';
  libraryTarget = 'var'
  externals = {};
  externals['cs-core-sdk'] = 'CSCoreSDK';
  externals['../build/cs-netbanking-sdk.node.js'] = 'CSNetbankingSDK';
  externals['fs'] = {}
}else{
  console.log('Targeting node.js');
  externals = {};
  target = 'node';
  libraryTarget = 'commonjs2'
  outputFilename = 'tests.node.js'
  externals['../build/cs-netbanking-sdk.node.js'] = '../../build/cs-netbanking-sdk.node.js'
  mapExternals(['./node_modules'],externals);
    plugins.push(new webpack.BannerPlugin('require("source-map-support").install();',
                           { raw: true, entryOnly: false }));
    //new webpack.optimize.UglifyJsPlugin()
    //new webpack.IgnorePlugin(/webpack.\.js$/),
  externals['jasmine-ajax'] = "underscore"  
}
//console.log("Externals are: ", externals)




module.exports = {
  entry: './spec/tests.webpack.js',
  output: {
    path: path.join(__dirname,'spec','build'),
    filename: outputFilename,
    library: "CSNetbankingSDKTests",
    libraryTarget: libraryTarget
  },
  target: target,
  node: {
    __dirname: true
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  externals: externals,
  // Turn on sourcemaps
  devtool: 'source-map',
  // Add minification
  plugins: plugins,
  
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
};