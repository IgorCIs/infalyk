import { NODE_ENV } from './config/settings';
import commonConfig from './config/webpack.common';
import devConfig from './config/webpack.dev';
import buildConfig from './config/webpack.build';
import webpackMerge from 'webpack-merge';

export default webpackMerge(commonConfig, NODE_ENV === 'dev' ? devConfig : buildConfig);