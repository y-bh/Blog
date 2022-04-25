/*
 * @Author: 朱占为
 * @LastEditors: 朱占伟
 * @description: webpack 服务端生产环境配置
 * @Date: 2021-07-16 13:22:46
 * @LastEditTime: 2022-04-25 13:45:22
 */
const path = require('path');
const resolve = (filePth) => {
  return path.join(__dirname, path.join('../', filePth));
};
const base = require('./webpack.conmon.config.js');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (data) => {
  console.log('==================env=======', data);
  const common = require(resolve(`config/${data.env}.config.js`));
  console.log('==================common=======', common);
  const obj = merge(base, {
    mode: 'production',
    output: {
      filename: 'js/[name].[contenthash].js',
      path: config.m_dest,
      clean: true
    },
    devtool: 'source-map',
    // 资源转换
    module: {
      rules: [
      ]
    },
    // 插件
    plugins: [
      new webpack.DefinePlugin({
        'process.env.common': common
      }),
      // 压缩css
      new OptimizeCssAssetsWebpackPlugin()

    ],

    resolveLoader: {
      modules: [
        resolve('node_modules'),
        path.resolve('loaders')
      ]
    },

    // 优化
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        cacheGroups: {
          elementPlus: {
            test: /element-plus/,
            name: 'elementPlus',
            chunks: 'all',
            priority: 1
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: -10
          }
        }
      }
    },
    performance: {
      hints: "warning", // 枚举
      maxAssetSize: 300000, // 整数类型（以字节为单位）
      maxEntrypointSize: 500000, // 整数类型（以字节为单位）
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
      }
    }
  });

  return obj
};
