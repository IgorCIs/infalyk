import { DIST } from './settings';

export default {
    devtool: 'source-map',
    devServer: {
        contentBase: DIST,
        open: true
    }
}