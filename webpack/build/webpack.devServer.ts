import path from "path";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server"
import { WebpackOptions } from "../types/types";

export function getDevServer({paths}: WebpackOptions): DevServerConfiguration {
  return {
    static: path.resolve(__dirname, '../..', paths.output),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    watchFiles: path.resolve(__dirname, '../..', paths.html)
  }
}