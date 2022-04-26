/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 个人中心工程配置文件
 * @Date: 2022-04-25 15:57:44
 * @LastEditTime: 2022-04-26 15:37:50
 */

const appConfig = require('config/app.config.js')
const path = require('path');
const resolve = (filePth) => {
  return path.resolve(__dirname, path.join('../', filePth));
};
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const config = require("config/app.config.js")

module.exports = {
  context: __dirname,
  output: {
    filename: 'manager/js/[name].[contenthash].js',
    clean: true,
    publicPath: '/'
  },
  // 资源转换
  module: {
    rules: [
      { test: /\.js$/i, use: ['babel-loader'] },
      { test: /\.vue$/i, use: ['vue-loader'] },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 3000,
            name: 'manager/images/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(css)|(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: resolve('client_m/assets/css/var.scss')
            }
          }
        ]
      },
      {
        test: /\.(woff|ttf|eot|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 3000,
            name: 'manager/font/[name].[ext]'
          }
        }]
      },
    ]
  },

  plugins: [
    new VueLoaderPlugin(),

    // 提取css
    new MiniCssExtractPlugin({
      filename: 'manager/css/[name].[contenthash].css'
      // 'css/[name].[contenthash].css' // 输出的文件名字
    }),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: './../views/manager.html',
      minify: {
        removeAttributeQuotes: false, // 删除属性的引号
        removeComments: true, // 删除注释
        collapseWhitespace: true // 删除空格，
      }
    }),

  ],

  resolve: {
    mainFiles: ['index'],
    extensions: ['.vue', '.js', '.scss', '.css'],
    alias: {
      config: path.join(__dirname, "../config"),
      tools: path.join(config.client_m, '/tools'),
      views: path.join(config.client_m, '/views'),
      model: path.join(config.client_m, '/model'),
      assets: path.join(config.client_m, '/assets'),
      '@': config.client_m,
      'components': path.join(config.client_m, '/components'),
      vue$: 'vue/dist/vue.runtime.esm-bundler.js'
    }
  },
};
