/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: webpack本地开发环境配置
 * @Date: 2021-07-16 13:22:33
 * @LastEditTime: 2022-04-25 13:45:11
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


const config = require("../../src/config/app.config")



module.exports = (data) => {
  const common = require(resolve(`config/${data.env}.config.js`));
  console.log('==common==', common);

  // 是否启用eslint
  const plugins = [
    new webpack.DefinePlugin({
      'process.env.common': common
    })
  ];

  // 是否启用eslint
  if (config.m_eslint) {
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
  if (config.m_stylelint) {
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
    output: {
      filename: 'js/[name].[contenthash].js',
      path: config.m_dest,
      clean: true
    },
    mode: 'development',
    devtool: config.m_devtool,
    plugins,
    devServer: {
      historyApiFallback: {
        rewrites: [
          { from: /.*/, to: path.posix.join(config.m_assetsPublicPath, 'index.html') },
        ],
      },
      port: config.m_port || 3000,
      host: config.m_address || '127.0.0.1',
      open: false,
      hot: false,
      proxy: {
        '/myApi': {
          target: config.url

        }
      }
    }
  });
  return obj
};
