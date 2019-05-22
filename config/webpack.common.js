import webpack from 'webpack';
import { DIST, HASH, RELATIVE_PATH, SRC } from './settings';
import loaders, { ETPStyles } from './loaders';
import pug from './pug';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
    context: SRC,
    entry: './main.js',
    output: {
        path: DIST,
        publicPath: RELATIVE_PATH,
        filename: `js/app${HASH}.js`
    },
    module: {
        rules: loaders
    },
    plugins: [
        new CopyWebpackPlugin([ { from: SRC + '/models', to: 'models' } ]),
        new webpack.NoEmitOnErrorsPlugin(),
        ETPStyles,
        ...pug
    ]
};