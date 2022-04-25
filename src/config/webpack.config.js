/*
 * @Author: 朱占伟
 * @LastEditors: 朱占伟
 * @description: 个人中心工程配置文件
 * @Date: 2022-04-25 15:57:44
 * @LastEditTime: 2022-04-25 16:26:46
 */

const path = require('path');
const resolve = (filePth) => {
  return path.resolve(__dirname, path.join('../', filePth));
};
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const config = require("./app.config")

module.exports = {
  context: __dirname,

  output: {
    filename: 'js/[name].[contenthash].js',
    path: config.m_dest,
    clean: true
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
            name: 'images/[name].[ext]'
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
              resources: resolve('src/assets/css/var.scss')
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
            name: 'font/[name].[ext]'
          }
        }]
      },
    ]
  },

  plugins: [
    new VueLoaderPlugin(),

    // 提取css
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css' // 输出的文件名字
    }),
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      filename: 'index.html',
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
      views: resolve('views'),
      model: resolve('model'),
      assets: resolve('src/assets'),
      '@': path.resolve(__dirname, '..'),
      'components': resolve('components'),
      vue$: 'vue/dist/vue.runtime.esm-bundler.js'
    }
  },
};
