import { NODE_ENV, HASH } from './settings';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default [
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
        test: /\.(png|gif|svg|jpe?g)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                    name: `images/[path][name]${HASH}.[ext]`,
                    limit: 8192
                }
            },
            {
                loader: 'img-loader',
                options: {
                    enabled: NODE_ENV === 'build',
                }
            }
        ]
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: `fonts/[name].[ext]`
                }
            }
        ]
    },
    {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
            use: [
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: NODE_ENV === 'dev',
                        minimize: false 
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({
                                browsers:['ie >= 8', 'last 4 version']
                            })
                        ],
                        sourceMap: true
                    }
                },
                'resolve-url-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        })
    },
    {
        test: /\.pug$/,
        use: [
            {
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }
        ]
    }
];

export const ETPStyles = new ExtractTextPlugin(`style.css`); // ${NODE_ENV === 'build' ? '.[contenthash]' : ''}