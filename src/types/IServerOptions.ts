import { ISkynarModule } from "../index";

export interface IServerOptions {
  modules: any[],
  providers?: any[],
  parseBody?: boolean,
  staticFilesFolder?: string
}