/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');
// const HtmlWebPackPlugin = require('html-webpack-plugin');

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/stylus/variables.styl'),
        path.resolve(__dirname, './src/assets/stylus/responsive.styl'),
      ],
    });
}
// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/pattern-form/' : '/',
  productionSourceMap: false,
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('stylus').oneOf(type)));
    config.optimization.delete('splitChunks');

    // const svgRule = config.module.rule('svg');

    // svgRule.uses.clear();

    // svgRule
    //   .use('babel-loader')
    //   .loader('babel-loader')
    //   .end();
  },
  devServer: {
    proxy: 'http://localhost:8080',
  },
  configureWebpack: {
    output: {
      filename: `js/[name].pattern-form.js?t=${Date.now()}`,
    },
    plugins: [
      // new CopyPlugin({
      //   patterns: [
      //     { from: 'src/assets/images/players', to: 'players' },
      //     { from: 'src/assets/images/', to: 'images' },
      //   ],
      // }),
      // new HtmlWebPackPlugin({
      //   template: './src/img.hbs',
      //   filename: './img.hbs',
      //   excludeChunks: ['app'],
      // }),
      // new HtmlWebPackPlugin({
      //   template: './src/share.hbs',
      //   filename: './share.hbs',
      //   excludeChunks: ['app'],
      // }),
    ],
    devtool: 'source-map',
  },
  css: {
    sourceMap: false,
    extract: false,
  },
};
