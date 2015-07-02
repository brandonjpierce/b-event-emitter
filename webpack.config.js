var webpack = require('webpack');
var path = require('path');

var env = process.env.NODE_ENV || 'development';
var isProduction = env === 'production';
var plugins = [];

if (isProduction) {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true,
      screw_ie8: true,
      side_effects: true,
			sequences: true,
      dead_code: true,
			drop_debugger: true,
			comparisons: true,
			conditionals: true,
			evaluate: true,
			booleans: true,
			loops: true,
			unused: true,
			hoist_funs: true,
      hoist_vars: true,
			if_return: true,
			join_vars: true,
			cascade: true,
      drop_console: true,
      properties: true
    },
    mangle: true
  }));
}

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: isProduction ? 'event-emitter.min.js' : 'event-emitter.js',
    library: 'EventEmitter',
    libraryTarget: 'umd'
  },
  
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel'
    }]
  },
  
  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },
  
  plugins: plugins
};
