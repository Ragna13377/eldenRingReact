export type ProjectMode = 'prod' | 'dev'
export interface EnvVariables {
  mode?: ProjectMode
}
export interface WebpackPaths {
  src: string,
  entry: string,
  output: string,
  html: string
}
export interface WebpackOptions{
  paths: WebpackPaths
  mode: ProjectMode
}
