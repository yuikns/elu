const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const devServer = {
    // contentBase: './build',
    contentBase: __dirname + '/build',
    historyApiFallback: {
        rewrites: [],
    }
}

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: devServer
})
