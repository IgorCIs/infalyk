import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { DIRECTION } from './settings';

export default {
    plugins: [
        new CleanWebpackPlugin('dist', {
            root: DIRECTION
        })
    ]
};