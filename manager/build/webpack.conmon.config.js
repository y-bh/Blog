/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: webpack通用配置
 * @Date: 2021-07-16 13:22:20
 * @LastEditTime: 2022-03-14 16:36:34
 */
const path = require('path');
const resolve = (filePth) => {
  return path.resolve(__dirname, path.join('../', filePth));
};
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
// 友好的错误提示插件
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// 提示插件
const notifier = require('node-notifier');
module.exports = {
  context: __dirname,
  entry: {
    app: '../src/index.js' // 入口文件
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: resolve('dist'),
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
            name: 'image/[name].[ext]'
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
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        const error = errors[0];
        notifier.notify({
          title: 'Webpack编译失败',
          message: severity + ': ' + error.name,
          subtitle: error.file || ''
          // icon: ICON,
        });
      }
    })
  ],

  resolve: {
    mainFiles: ['index'],
    extensions: ['.vue', '.js','.scss','.css'],
    alias: {
      views: resolve('src/views'),
      model: resolve('src/model'),
      utils: resolve('src/utils'),
      assets: resolve('src/assets'),
      config: resolve('src/config'),
      src: resolve('src'),
      '@': path.resolve(__dirname, '..'),
      'components': resolve('src/components'),
      vue$: 'vue/dist/vue.runtime.esm-bundler.js'
    }
  },
};
