import path from 'path';

const relativePathForBuild = './';
const src = './src';
const dist = './dist';

export const NODE_ENV = process.env.NODE_ENV;
export const DIRECTION = path.resolve(__dirname, '../');
export const HASH = '';
export const RELATIVE_PATH = NODE_ENV === 'build' ? relativePathForBuild : '/';
export const SRC = path.resolve(DIRECTION, src);
export const DIST = path.resolve(DIRECTION, dist);