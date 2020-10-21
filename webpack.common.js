const path = require('path');
const DtsBundler = require('dts-bundle-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [{test: /\.tsx?$/, use: ['ts-loader']}],
  },
  plugins: [
    new DtsBundler({
      name: 'error-doctor',
      main: './lib/index.d.ts',
      baseDir: 'dist',
      out: 'index.d.ts',
    }),
  ],
  externals: [nodeExternals()],
};
