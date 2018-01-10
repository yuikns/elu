const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// https://github.com/johnagan/clean-webpack-plugin
// the path(s) that should be cleaned
let pathsToClean = ['build']

// the clean options to use
let cleanOptions = {
  root: __dirname,
  exclude: [],
  watch: false,
  verbose: true,
  dry: false
}


module.exports = ({
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
    vendors: ['react', 'react-dom']
  },
  output: {
    filename: 'js/[name].[hash:8].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.sass$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.jsx?$/, exclude: /node_modules/, use: {
          loader: 'babel-loader', options: {
            presets: [
              "env",
              "react",
              "stage-2",
            ],
            // auto import antd https://github.com/ant-design/babel-plugin-import
            plugins: [['import', { libraryName: 'antd', style: true }]],
            cacheDirectory: true,
          }
        }
      },
      { test: /\.(png|jpg|jpeg|gif|ico)$/, use: 'url-loader?limit=1024&name=images/[name].[ext]' },
      { test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, use: 'url-loader' },
    ]
  },
  plugins: [
    // remove/clean your build folder(s) before building
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new HtmlWebpackPlugin({
      title: 'ArgCV',
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
})
