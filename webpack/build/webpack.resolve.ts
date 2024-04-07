import path from "path";
import {WebpackPaths} from "../types/types";
import {Configuration} from "webpack";

export function getResolve(paths: WebpackPaths): Configuration['resolve'] {
  return {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.scss',
      '.png',
      '.jpg',
      '.svg',
      '.webp'],
    alias: {
      '@': path.resolve(__dirname, '../..', paths.src),
      '@shared': path.resolve(__dirname, '../..', paths.src, 'shared'),
      '@entities': path.resolve(__dirname, '../..', paths.src, 'entities'),
      '@features': path.resolve(__dirname, '../..', paths.src, 'features'),
      '@widgets': path.resolve(__dirname, '../..', paths.src, 'widgets'),
      '@pages': path.resolve(__dirname, '../..', paths.src, 'pages'),
      '@processes': path.resolve(__dirname, '../..', paths.src, 'processes'),
    }
  }
}