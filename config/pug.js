import path from 'path';
import fs from 'fs';
import { SRC } from './settings';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const recursiveSearch = (startPath, filter, callback) => {

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    const files = fs.readdirSync(startPath);

    for (let i = 0; i < files.length; i++) {
        let filename = path.join(startPath, files[i]);

        let stat = fs.lstatSync(filename);

        if (!stat.isDirectory() && filter.test(filename)) {
            callback(filename);
        }
    }
};

let pug = [];

recursiveSearch(SRC, /.pug$/, (path) => {
    let name;

    if ((/win/i).test(process.platform)) name = path.split('\\');
    else name = path.split('/');

    name = name[name.length - 1].replace('.pug', '');

    pug.push(new HtmlWebpackPlugin({
        template: path,
        filename: `${name}.html`,
        minify: false
    }));
});

export default pug;


