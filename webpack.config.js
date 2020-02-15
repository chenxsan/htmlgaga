const HtmlWebpackPlugin = require('html-webpack-plugin')

const { rules, extensions, plugins } = require('./constant')

module.exports = {
  mode: 'development',
  module: {
    rules
  },
  resolve: {
    extensions
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      title: 'HTML gaga',
      template: './index.html'
    })
  ]
}
