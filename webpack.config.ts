import webpack from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { merge } from 'webpack-merge'


const prodConfig = require('./webpack.prod');

module.exports = function (env: any) {
  const isEnvProduction = env.environment === 'prod';

  const commonConfig = {
    entry: './src/index.ts',
    target: 'node',
    output: {
      filename: 'index.js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin( { ...process.env } ),
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  };

  if (isEnvProduction) return merge(commonConfig, prodConfig);
};