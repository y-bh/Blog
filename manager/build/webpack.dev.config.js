/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: webpack本地开发环境配置
 * @Date: 2021-07-16 13:22:33
 * @LastEditTime: 2022-03-14 16:44:46
 */

const path = require('path');
const resolve = (filePth) => {
  return path.join(__dirname, path.join('../', filePth));
};

const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { merge } = require('webpack-merge');
const base = require('./webpack.conmon.config.js');
const webpack = require('webpack');
const config = require('../config')(process.env.NODE_ENV);

module.exports = (data) => {
  const common = require(resolve(`config/${data.env}.config.js`));
  console.log('==common==', common.ProxyApi === 'http://1.117.101.113:8081');

  // 是否启用eslint
  const plugins = [
    new webpack.DefinePlugin({
      'process.env.common': common
    })
  ];

  // 是否启用eslint
  if (config.eslint) {
    plugins.push(
      new ESLintPlugin({
        context: resolve('src'),
        extensions: ['js', 'vue'],
        fix: true,
        cache: false,
        ignore: true,
        useEslintrc: true
      })
    );
  }

  // 是否启用stylelint
  if (config.stylelint) {
    plugins.push(
      new StylelintPlugin({
        files: ['../src/**/*.{vue,css,scss}'],
        failOnError: false,
        cache: false,
        fix: true
      })
    );
  }

   const obj = merge(base, {
    mode: 'development',
    devtool: config.devtool,
    module: {

    },

    plugins,
    devServer: {
      historyApiFallback: {
        rewrites: [
          { from: /.*/, to: path.posix.join(config.assetsPublicPath, 'index.html') },
        ],
      },
      port: config.port || 3000,
      host: config.host || '127.0.0.1',
      open: config.open,
      hot: false,
      contentBase: path.join(__dirname, '..', 'dist'),
      proxy: {
        '/myApi': {
          target: 'http://localhost:81/'

        }
      }
    }
  });

  //是否打开分析日志
  if (config && config.analyzer) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    obj.plugins.push(new BundleAnalyzerPlugin())
  }

  return obj
};
