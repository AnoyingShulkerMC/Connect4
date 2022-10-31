import {resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"
export default {
  entry: './index.js',
  output: {
    filename: 'tetris.cjs',
    path: resolve(dirname(fileURLToPath(import.meta.url)), 'dist')
    
  },
  target: "node",
  externals: {
    "uiohook-napi" : "commonjs uiohook-napi"
  },
  experiments: {
    topLevelAwait: true
  }
}